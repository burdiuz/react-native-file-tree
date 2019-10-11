import React from 'react';
import PropTypes from 'prop-types';

import { getItemType } from './constants';

import { folderRowStyles } from './styles';

import FileRow from './FileRow';

import {
  directoryIconRenderer,
  directoryTitleRenderer,
  directoryButtonsRenderer,
  defaultContainerRenderer,
  directoryContentRenderer,
} from './renderers';

const DirectoryRow = (props) => {
  const {
    touchable,
    iconRenderer,
    titleRenderer,
    buttonsRenderer,
    containerRenderer,
    contentRenderer,
    expanded,
    item,
    style,
    children,
    ...rowProps
  } = props;
  let content = null;

  const row = containerRenderer(
    <FileRow
      {...rowProps}
      item={item}
      iconRenderer={iconRenderer}
      titleRenderer={titleRenderer}
      buttonsRenderer={buttonsRenderer}
      style={style || folderRowStyles.container}
      expanded={expanded}
      touchable
    />,
  );

  if (expanded) {
    content = contentRenderer(props);
  }

  return (
    <>
      {row}
      {children}
      {content}
    </>
  );
};

DirectoryRow.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  expanded: PropTypes.bool,
  touchable: PropTypes.bool,
  getItemType: PropTypes.func,
  iconRenderer: PropTypes.func,
  titleRenderer: PropTypes.func,
  buttonsRenderer: PropTypes.func,
  containerRenderer: PropTypes.func,
  contentRenderer: PropTypes.func,
};

DirectoryRow.defaultProps = {
  getItemType,
  expanded: false,
  touchable: false,
  iconRenderer: directoryIconRenderer,
  titleRenderer: directoryTitleRenderer,
  buttonsRenderer: directoryButtonsRenderer,
  containerRenderer: defaultContainerRenderer,
  contentRenderer: directoryContentRenderer,
};

export default DirectoryRow;
