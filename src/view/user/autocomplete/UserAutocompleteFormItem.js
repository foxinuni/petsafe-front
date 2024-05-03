import React, { Component } from 'react';
import service from 'modules/user/userService';
import AutocompleteFormItem from 'view/shared/form/items/AutocompleteFormItem';

class UserAutocompleteFormItem extends Component {
  fetchFn = (value) => {
    return service.fetchUserAutocomplete(value, 10);
  };

  mapper = {
    toAutocomplete(value) {
      if (!value) {
        return undefined;
      }

      if (value.fullName || value.email) {
        let label = value.email;

        if (value.fullName) {
          label = `${value.fullName} <${value.email}>`;
        }

        return {
          key: value.id,
          label,
        };
      }

      return {
        key: value.id,
        label: value.label,
      };
    },

    toValue(value) {
      if (!value) {
        return undefined;
      }

      return {
        id: value.key,
        label: value.label,
      };
    },
  };

  render() {
    console.log('render desde userAutoCompleteFormItem');
    return (
      <AutocompleteFormItem
        {...this.props}
        fetchFn={this.fetchFn}
        mapper={this.mapper}
      />
    );
  }
}

export default UserAutocompleteFormItem;
