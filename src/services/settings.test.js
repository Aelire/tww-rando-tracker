import _ from 'lodash';

import FLAGS from '../data/flags.json';

import Permalink from './permalink';
import Settings from './settings';

describe('Settings', () => {
  beforeEach(() => {
    Settings.reset();
  });

  describe('initializeFromPermalink', () => {
    describe('default settings', () => {
      beforeEach(() => {
        Settings.initializeFromPermalink(Permalink.DEFAULT_PERMALINK);
      });

      test('initializes the version', () => {
        expect(Settings.version).toEqual('5f1bae6');
      });

      test('initializes the starting gear', () => {
        expect(Settings.startingGear).toMatchSnapshot();
      });

      test('initializes the options', () => {
        expect(Settings.options).toMatchSnapshot();
      });

      test('initializes the flags', () => {
        expect(Settings.flags).toEqual([
          Settings.FLAGS.BOSS,
          Settings.FLAGS.RANDOMIZABLE_MINIBOSS_ROOM,
          Settings.FLAGS.DUNGEON,
          Settings.FLAGS.GREAT_FAIRY,
          Settings.FLAGS.PUZZLE_SECRET_CAVE,
          Settings.FLAGS.COMBAT_SECRET_CAVE,
          Settings.FLAGS.SHORT_SIDEQUEST,
          Settings.FLAGS.LONG_SIDEQUEST,
          Settings.FLAGS.SPOILS_TRADING,
          Settings.FLAGS.MINIGAME,
          Settings.FLAGS.FREE_GIFT,
          Settings.FLAGS.MAIL,
          Settings.FLAGS.PLATFORM,
          Settings.FLAGS.RAFT,
          Settings.FLAGS.SUBMARINE,
          Settings.FLAGS.EYE_REEF_CHEST,
          Settings.FLAGS.BIG_OCTO,
          Settings.FLAGS.GUNBOAT,
          Settings.FLAGS.SUNKEN_TREASURE,
          Settings.FLAGS.EXPENSIVE_PURCHASE,
          Settings.FLAGS.OTHER_CHEST,
          Settings.FLAGS.MISC,
          Settings.FLAGS.TINGLE_CHEST,
          Settings.FLAGS.BATTLESQUID,
          Settings.FLAGS.SAVAGE_LABYRINTH,
          Settings.FLAGS.ISLAND_PUZZLE,
          Settings.FLAGS.DUNGEON_SECRET,
          Settings.FLAGS.SUNKEN_TREASURE, // Huh not sure why this one is doubled
        ]);
      });
    });

    describe('when using a development build', () => {
      beforeEach(() => {
        // version = 1.11.0_be1d4e2
        Settings.initializeFromPermalink('MS4xMS4wX2JlMWQ0ZTIAc2VlZABJEFAYAAD7AugSAAAAAAgABAEAAg==');
      });

      test('sets the version to be the commit hash', () => {
        expect(Settings.version).toEqual('be1d4e2');
      });
    });

    describe('when using a beta build', () => {
      beforeEach(() => {
        // version = 1.11.0-BETA_2022-11-28
        Settings.initializeFromPermalink('MS4xMS4wLUJFVEFfMjAyMi0xMS0yOABzZWVkAEkQUBgAAPsC6BIAAAAACAAEAQAC');
      });

      test('sets the version to master', () => {
        expect(Settings.version).toEqual('master');
      });
    });

    describe('all flags set', () => {
      beforeEach(() => {
        Settings.initializeFromPermalink('bWFzdGVyAHNlZWQA//9/GAAA+wLoEgAAAAAIAAQBAAI=');
      });

      test('initializes all the flags', () => {
        expect(_.difference(FLAGS, Settings.flags)).toEqual([]);
        expect(_.difference(Settings.flags, FLAGS)).toEqual([]);
      });
    });

    describe('all starting gear set', () => {
      beforeEach(() => {
        Settings.initializeFromPermalink('bWFzdGVyAHNlZWQASRBQGAAA+wLo+v//////v6suAAI=');
      });

      test('initializes the starting gear', () => {
        expect(Settings.startingGear).toMatchSnapshot();
      });
    });

    describe('only sunken triforce enabled', () => {
      describe('when charts are not randomized', () => {
        beforeEach(() => {
          Settings.initializeFromPermalink('bWFzdGVyAHNlZWQAAAAEGAAA+wLoEgAAAAAIAAQBAAI=');
        });

        test('initializes the flags', () => {
          expect(Settings.flags).toEqual([
            Settings.FLAGS.SUNKEN_TRIFORCE,
          ]);
        });
      });

      describe('when charts are randomized', () => {
        beforeEach(() => {
          Settings.initializeFromPermalink('bWFzdGVyAHNlZWQAAAAEGACA+wLoEgAAAAAIAAQBAAI=');
        });

        test('initializes the flags', () => {
          expect(Settings.flags).toEqual([
            Settings.FLAGS.SUNKEN_TREASURE,
          ]);
        });
      });
    });
  });

  describe('initializeRaw', () => {
    test('initializes the flags, options, starting gear, and version', () => {
      const flags = [Settings.FLAGS.TINGLE_CHEST];
      const options = {
        [Permalink.OPTIONS.RANDOMIZE_DUNGEON_ENTRANCES]: true,
      };
      const startingGear = {
        'Grappling Hook': 1,
      };
      const version = '1.0.0';

      Settings.initializeRaw({
        flags,
        options,
        startingGear,
        version,
      });

      expect(Settings.flags).toEqual(flags);
      expect(Settings.options).toEqual(options);
      expect(Settings.startingGear).toEqual(startingGear);
      expect(Settings.version).toEqual(version);
    });
  });

  describe('reset', () => {
    beforeEach(() => {
      Settings.initializeRaw({
        flags: [Settings.FLAGS.TINGLE_CHEST],
        options: {
          [Permalink.OPTIONS.RANDOMIZE_DUNGEON_ENTRANCES]: true,
        },
        startingGear: {
          'Grappling Hook': 1,
        },
        version: '1.0.0',
      });
    });

    test('resets all the settings', () => {
      Settings.reset();

      expect(Settings.flags).toEqual(null);
      expect(Settings.options).toEqual(null);
      expect(Settings.startingGear).toEqual(null);
      expect(Settings.version).toEqual(null);
    });
  });

  describe('readAll', () => {
    let expectedFlags;
    let expectedOptions;
    let expectedStartingGear;
    let expectedVersion;

    beforeEach(() => {
      expectedFlags = [Settings.FLAGS.TINGLE_CHEST];
      expectedOptions = {
        [Permalink.OPTIONS.RANDOMIZE_DUNGEON_ENTRANCES]: true,
      };
      expectedStartingGear = {
        'Grappling Hook': 1,
      };
      expectedVersion = '1.0.0';

      Settings.initializeRaw({
        flags: expectedFlags,
        options: expectedOptions,
        startingGear: expectedStartingGear,
        version: expectedVersion,
      });
    });

    test('returns all of the settings', () => {
      const allSettings = Settings.readAll();

      expect(allSettings).toEqual({
        flags: expectedFlags,
        options: expectedOptions,
        startingGear: expectedStartingGear,
        version: expectedVersion,
      });
    });
  });

  describe('FLAGS', () => {
    test('returns the correct flags', () => {
      expect(Settings.FLAGS).toMatchSnapshot();
    });
  });

  describe('isFlagActive', () => {
    beforeEach(() => {
      Settings.initializeRaw({
        flags: [Settings.FLAGS.TINGLE_CHEST],
      });
    });

    describe('when the flag is in the list of flags', () => {
      test('returns true', () => {
        const isFlagActive = Settings.isFlagActive(Settings.FLAGS.TINGLE_CHEST);

        expect(isFlagActive).toEqual(true);
      });
    });

    describe('when the flag is not in the list of flags', () => {
      test('returns true', () => {
        const isFlagActive = Settings.isFlagActive(Settings.FLAGS.DUNGEON);

        expect(isFlagActive).toEqual(false);
      });
    });
  });

  describe('getOptionValue', () => {
    beforeEach(() => {
      Settings.initializeRaw({
        options: {
          [Permalink.OPTIONS.NUM_STARTING_TRIFORCE_SHARDS]: 7,
        },
      });
    });

    test('returns the value of the given option', () => {
      const optionValue = Settings.getOptionValue(Permalink.OPTIONS.NUM_STARTING_TRIFORCE_SHARDS);

      expect(optionValue).toEqual(7);
    });
  });

  describe('getStartingGear', () => {
    beforeEach(() => {
      Settings.initializeRaw({
        startingGear: {
          'Deku Leaf': 1,
        },
      });
    });

    test('returns the provided starting gear', () => {
      const startingGear = Settings.getStartingGear();

      expect(startingGear).toEqual({ 'Deku Leaf': 1 });
    });
  });

  describe('getVersion', () => {
    beforeEach(() => {
      Settings.initializeRaw({
        version: '1.0.0',
      });
    });

    test('returns the provided version', () => {
      const version = Settings.getVersion();

      expect(version).toEqual('1.0.0');
    });
  });
});
