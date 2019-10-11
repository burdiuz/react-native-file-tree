import React from 'react';
import PropTypes from 'prop-types';

import { VerticalList } from '@actualwave/react-native-vertical-list';

import { getItemType } from './constants';

import { filesItemRenderer, filesEmptyRenderer } from './renderers';

import { filesStyles } from './styles';

const Files = (props) => {
  const { listItemFilter, itemRenderer, emptyRenderer } = props;

  const { style, children, ...itemProps } = props;

  return (
    <VerticalList
      {...props}
      filter={listItemFilter}
      itemRenderer={(item, index) => itemRenderer(item, index, itemProps)}
      emptyRenderer={() => (emptyRenderer ? emptyRenderer(props) : null)}
      style={[filesStyles.files, style]}
    >
      {children}
    </VerticalList>
  );
};

Files.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  touchable: PropTypes.bool,
  children: PropTypes.node,
  listItemFilter: PropTypes.func,
  getItemType: PropTypes.func,
  itemRenderer: PropTypes.func,
  emptyRenderer: PropTypes.func,
};

Files.defaultProps = {
  getItemType,
  items: undefined,
  touchable: false,
  children: undefined,
  listItemFilter: undefined,
  itemRenderer: filesItemRenderer,
  emptyRenderer: filesEmptyRenderer,
};

export default Files;
