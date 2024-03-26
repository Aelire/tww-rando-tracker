import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import Permalink from '../services/permalink';
import Settings from '../services/settings';

import DropdownOptionInput from './dropdown-option-input';
import KeyDownWrapper from './key-down-wrapper';
import OptionsTable from './options-table';
import ThreeStateToggleInput from './three-state-toggle-input';
import ToggleOptionInput from './toggle-option-input';

class RandomSettingsWindow extends React.PureComponent {
  constructor(props) {
    super(props);

    const { certainSettings, options } = Settings.readAll();

    this.state = { certainSettings, options };

    this.applySettings = this.applySettings.bind(this);
    this.setCertainSettings = this.setCertainSettings.bind(this);
    this.setOptionValue = this.setOptionValue.bind(this);
  }

  getOptionValue(optionName) {
    const { options } = this.state;

    return _.get(options, optionName);
  }

  setOptionValue(optionName, newValue) {
    const { options } = this.state;

    const newOptions = _.cloneDeep(options);

    _.set(newOptions, optionName, newValue);

    this.setState({
      options: newOptions,
    });
  }

  setCertainSettings(optionName, newValue) {
    const { certainSettings } = this.state;

    const newCertainSettings = _.cloneDeep(certainSettings);

    const certainSettingsValue = newValue === Settings.SETTING_STATE.CERTAIN;

    if (newValue === Settings.SETTING_STATE.OFF) {
      this.setOptionValue(optionName, false);
    } else {
      this.setOptionValue(optionName, true);
    }

    _.set(newCertainSettings, optionName, certainSettingsValue);

    this.setState({
      certainSettings: newCertainSettings,
    });
  }

  progressionInput({ labelText, optionName }) {
    const { certainSettings } = this.state;

    const certainSettingsValue = _.get(certainSettings, optionName);
    const optionValue = this.getOptionValue(optionName);

    let optionValueDisplay;
    if (certainSettingsValue) {
      optionValueDisplay = Settings.SETTING_STATE.CERTAIN;
    } else {
      optionValueDisplay = optionValue ? Settings.SETTING_STATE.ON : Settings.SETTING_STATE.OFF;
    }

    return (
      <ThreeStateToggleInput
        key={optionName}
        labelText={labelText}
        optionName={optionName}
        optionValue={optionValueDisplay}
        setOptionValue={this.setCertainSettings}
      />
    );
  }

  toggleInput({ labelText, optionName }) {
    const optionValue = this.getOptionValue(optionName);

    return (
      <ToggleOptionInput
        key={optionName}
        labelText={labelText}
        optionName={optionName}
        optionValue={optionValue}
        setOptionValue={this.setOptionValue}
      />
    );
  }

  dropdownInput({ labelText, optionName, isDisabled }) {
    const optionValue = this.getOptionValue(optionName);

    return (
      <DropdownOptionInput
        key={optionName}
        labelText={labelText}
        optionName={optionName}
        optionValue={optionValue}
        setOptionValue={this.setOptionValue}
        isDisabled={isDisabled}
      />
    );
  }

  progressItemLocationsTable() {
    return (
      <OptionsTable
        title="Progress Item Locations"
        numColumns={3}
        options={[
          this.progressionInput({
            labelText: 'Dungeons',
            optionName: Permalink.OPTIONS.PROGRESSION_DUNGEONS,
          }),
          this.progressionInput({
            labelText: 'Puzzle Secret Caves',
            optionName: Permalink.OPTIONS.PROGRESSION_PUZZLE_SECRET_CAVES,
          }),
          this.progressionInput({
            labelText: 'Combat Secret Caves',
            optionName: Permalink.OPTIONS.PROGRESSION_COMBAT_SECRET_CAVES,
          }),
          this.progressionInput({
            labelText: 'Savage Labyrinth',
            optionName: Permalink.OPTIONS.PROGRESSION_SAVAGE_LABYRINTH,
          }),
          this.progressionInput({
            labelText: 'Island Puzzles',
            optionName: Permalink.OPTIONS.PROGRESSION_ISLAND_PUZZLES,
          }),
          this.progressionInput({
            labelText: 'Dungeon Secrets',
            optionName: Permalink.OPTIONS.PROGRESSION_DUNGEON_SECRETS,
          }),
          this.progressionInput({
            labelText: 'Tingle Chests',
            optionName: Permalink.OPTIONS.PROGRESSION_TINGLE_CHESTS,
          }),
          this.progressionInput({
            labelText: 'Great Fairies',
            optionName: Permalink.OPTIONS.PROGRESSION_GREAT_FAIRIES,
          }),
          this.progressionInput({
            labelText: 'Submarines',
            optionName: Permalink.OPTIONS.PROGRESSION_SUBMARINES,
          }),
          this.progressionInput({
            labelText: 'Lookout Platforms and Rafts',
            optionName: Permalink.OPTIONS.PROGRESSION_PLATFORMS_RAFTS,
          }),
          this.progressionInput({
            labelText: 'Short Sidequests',
            optionName: Permalink.OPTIONS.PROGRESSION_SHORT_SIDEQUESTS,
          }),
          this.progressionInput({
            labelText: 'Long Sidequests',
            optionName: Permalink.OPTIONS.PROGRESSION_LONG_SIDEQUESTS,
          }),
          this.progressionInput({
            labelText: 'Spoils Trading',
            optionName: Permalink.OPTIONS.PROGRESSION_SPOILS_TRADING,
          }),
          this.progressionInput({
            labelText: 'Eye Reef Chests',
            optionName: Permalink.OPTIONS.PROGRESSION_EYE_REEF_CHESTS,
          }),
          this.progressionInput({
            labelText: 'Big Octos and Gunboats',
            optionName: Permalink.OPTIONS.PROGRESSION_BIG_OCTOS_GUNBOATS,
          }),
          this.progressionInput({
            labelText: 'Miscellaneous',
            optionName: Permalink.OPTIONS.PROGRESSION_MISC,
          }),
          this.progressionInput({
            labelText: 'Minigames',
            optionName: Permalink.OPTIONS.PROGRESSION_MINIGAMES,
          }),
          this.progressionInput({
            labelText: 'Battlesquid Minigame',
            optionName: Permalink.OPTIONS.PROGRESSION_BATTLESQUID,
          }),
          this.progressionInput({
            labelText: 'Free Gifts',
            optionName: Permalink.OPTIONS.PROGRESSION_FREE_GIFTS,
          }),
          this.progressionInput({
            labelText: 'Mail',
            optionName: Permalink.OPTIONS.PROGRESSION_MAIL,
          }),
          this.progressionInput({
            labelText: 'Expensive Purchases',
            optionName: Permalink.OPTIONS.PROGRESSION_EXPENSIVE_PURCHASES,
          }),
          this.progressionInput({
            labelText: 'Sunken Treasure (From Triforce Charts)',
            optionName: Permalink.OPTIONS.PROGRESSION_TRIFORCE_CHARTS,
          }),
          this.progressionInput({
            labelText: 'Sunken Treasure (From Treasure Charts)',
            optionName: Permalink.OPTIONS.PROGRESSION_TREASURE_CHARTS,
          }),
        ]}
      />
    );
  }

  entranceRandomizerOptionsTable() {
    return (
      <OptionsTable
        title="Entrance Randomizer Options"
        numColumns={2}
        options={[
          this.toggleInput({
            labelText: 'Dungeons',
            optionName: Permalink.OPTIONS.RANDOMIZE_DUNGEON_ENTRANCES,
          }),
          this.toggleInput({
            labelText: 'Nested Bosses',
            optionName: Permalink.OPTIONS.RANDOMIZE_BOSS_ENTRANCES,
          }),
          this.toggleInput({
            labelText: 'Nested Minibosses',
            optionName: Permalink.OPTIONS.RANDOMIZE_MINIBOSS_ENTRANCES,
          }),
          this.toggleInput({
            labelText: 'Secret Caves',
            optionName: Permalink.OPTIONS.RANDOMIZE_SECRET_CAVE_ENTRANCES,
          }),
          this.toggleInput({
            labelText: 'Inner Secret Caves',
            optionName: Permalink.OPTIONS.RANDOMIZE_SECRET_CAVE_INNER_ENTRANCES,
          }),
          this.toggleInput({
            labelText: 'Fairy Fountains',
            optionName: Permalink.OPTIONS.RANDOMIZE_FAIRY_FOUNTAIN_ENTRANCES,
          }),
          this.dropdownInput({
            labelText: 'Mixing',
            optionName: Permalink.OPTIONS.MIX_ENTRANCES,
            isDisabled: !(
              (this.getOptionValue(Permalink.OPTIONS.RANDOMIZE_BOSS_ENTRANCES)
              || this.getOptionValue(Permalink.OPTIONS.RANDOMIZE_DUNGEON_ENTRANCES)
              || this.getOptionValue(Permalink.OPTIONS.RANDOMIZE_MINIBOSS_ENTRANCES))
              && (this.getOptionValue(Permalink.OPTIONS.RANDOMIZE_FAIRY_FOUNTAIN_ENTRANCES)
              || this.getOptionValue(Permalink.OPTIONS.RANDOMIZE_SECRET_CAVE_ENTRANCES)
              || this.getOptionValue(Permalink.OPTIONS.RANDOMIZE_SECRET_CAVE_INNER_ENTRANCES))
            ),
          }),
        ]}
      />
    );
  }

  additionalOptionsTable() {
    return (
      <OptionsTable
        title="Additional Options"
        numColumns={2}
        options={[
          this.dropdownInput({
            labelText: 'Sword Mode',
            optionName: Permalink.OPTIONS.SWORD_MODE,
            isDisabled: false,
          }),
          this.toggleInput({
            labelText: 'Key-Lunacy',
            optionName: Permalink.OPTIONS.KEYLUNACY,
          }),
          this.dropdownInput({
            labelText: 'Triforce Shards to Start With',
            optionName: Permalink.OPTIONS.NUM_STARTING_TRIFORCE_SHARDS,
            isDisabled: false,
          }),
          this.toggleInput({
            labelText: 'Randomize Charts',
            optionName: Permalink.OPTIONS.RANDOMIZE_CHARTS,
          }),
          this.toggleInput({
            labelText: 'Required Bosses Mode',
            optionName: Permalink.OPTIONS.REQUIRED_BOSSES,
          }),
          this.dropdownInput({
            labelText: 'Number of Required Bosses',
            optionName: Permalink.OPTIONS.NUM_REQUIRED_BOSSES,
            isDisabled: !this.getOptionValue(Permalink.OPTIONS.REQUIRED_BOSSES),
          }),
          this.toggleInput({
            labelText: 'Skip Boss Rematches',
            optionName: Permalink.OPTIONS.SKIP_REMATCH_BOSSES,
          }),
        ]}
      />
    );
  }

  async applySettings() {
    const { certainSettings, options } = this.state;
    const { updateLogic, toggleRandomSettingsWindow } = this.props;

    await updateLogic({ newCertainSettings: certainSettings, newOptions: options });
    toggleRandomSettingsWindow();
  }

  render() {
    const {
      toggleRandomSettingsWindow,
    } = this.props;

    return (
      <div className="random-settings-window">
        <div className="random-settings-top-row">
          <div className="random-settings-title">Settings</div>
          <div
            className="close-button"
            onClick={toggleRandomSettingsWindow}
            onKeyDown={KeyDownWrapper.onSpaceKey(toggleRandomSettingsWindow)}
            role="button"
            tabIndex="0"
          >
            X Close
          </div>
        </div>
        <div className="random-settings-wrapper">
          <div className="random-settings">
            {this.progressItemLocationsTable()}
            {this.entranceRandomizerOptionsTable()}
            {this.additionalOptionsTable()}
          </div>
          <div className="random-settings-apply">
            <button
              onClick={this.applySettings}
              type="button"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    );
  }
}

RandomSettingsWindow.propTypes = {
  toggleRandomSettingsWindow: PropTypes.func.isRequired,
  updateLogic: PropTypes.func.isRequired,
};

export default RandomSettingsWindow;
