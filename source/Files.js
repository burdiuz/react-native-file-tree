import React from 'react';
import PropTypes from 'prop-types';

import { VerticalList } from '@actualwave/react-native-vertical-list';

import { getItemType } from './constants';

import { filesItemRenderer, filesEmptyRenderer } from './renderers';

import { filesStyles } from './styles';

const Files = (props) => {
  const { style, children, itemRenderer, emptyRenderer, items, ...itemProps } = props;

  return (
    <VerticalList
      {...props}
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
  getItemType: PropTypes.func,
  itemRenderer: PropTypes.func,
  emptyRenderer: PropTypes.func,
};

Files.defaultProps = {
  getItemType,
  items: undefined,
  touchable: false,
  children: undefined,
  itemRenderer: filesItemRenderer,
  emptyRenderer: filesEmptyRenderer,
};

export default Files;
