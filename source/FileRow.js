import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { Row, TouchableRow } from '@actualwave/react-native-vertical-list';

import { fileIconRenderer, fileTitleRenderer, fileButtonsRenderer } from './renderers';

import { fileRowStyles } from './styles';

const FileInfo = (props) => {
  const { item, iconRenderer, titleRenderer, style } = props;
  return (
    <View style={[fileRowStyles.info, style]}>
      {iconRenderer(item, props)}
      {titleRenderer(item, props)}
    </View>
  );
};

const ButtonsGroup = ({ style, children }) => (
  <View style={[fileRowStyles.buttons, style]}>{children}</View>
);

const FileRow = ({ buttonsRenderer, style, children, ...props }) => {
  const { touchable, item, ...containerProps } = props;

  const Component = touchable ? TouchableRow : Row;

  return (
    <Component {...containerProps} style={style || fileRowStyles.container}>
      <FileInfo {...props} />
      {children}
      <ButtonsGroup>{buttonsRenderer(item, props)}</ButtonsGroup>
    </Component>
  );
};

FileRow.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  touchable: PropTypes.bool,
  iconRenderer: PropTypes.func,
  titleRenderer: PropTypes.func,
  buttonsRenderer: PropTypes.func,
};

FileRow.defaultProps = {
  touchable: false,
  iconRenderer: fileIconRenderer,
  titleRenderer: fileTitleRenderer,
  buttonsRenderer: fileButtonsRenderer,
};

export default FileRow;
