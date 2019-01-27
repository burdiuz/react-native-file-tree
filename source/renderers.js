import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from '@actualwave/react-native-kingnare-style';
import FontFamily from 'react-native-vector-icons/FontAwesome';

import { DIRECTORY_TYPE, FILE_TYPE, getItemType } from './constants';
import { fileRowStyles, folderRowStyles, filesStyles } from './styles';
import FileRow from './FileRow';
import DirectoryRow from './DirectoryRow';
import Files from './Files';

// File renderers

export const fileIconRenderer = () => (
  <FontFamily name="file-text-o" size={20} color="#ccc" style={fileRowStyles.icon} />
);
export const fileTitleRenderer = ({ name }) => <Text style={fileRowStyles.title}>{name}</Text>;
export const fileButtonsRenderer = () => null;

// Directory renderers

export const directoryIconRenderer = (item, props) => {
  const { expanded, getItemType } = props;

  if (getItemType(item) === DIRECTORY_TYPE) {
    return (
      <FontFamily
        name={expanded ? 'folder-open-o' : 'folder-o'}
        size={20}
        color="#ccc"
        style={folderRowStyles.icon}
      />
    );
  }

  return fileIconRenderer(item, props);
};

export const directoryTitleRenderer = (item, props) => {
  const { content, getItemType, contentLength } = props;
  const { name } = item;
  let length = contentLength;
  let counter = null;

  if (isNaN(length) && content) {
    length = content.length;
  }

  if (!isNaN(length)) {
    counter = <Text style={{ color: 0x505050ff }}> ({length || '0'})</Text>;
  }

  if (getItemType(item) === DIRECTORY_TYPE) {
    return (
      <Text style={folderRowStyles.title}>
        {name}
        {counter}
      </Text>
    );
  }

  return fileTitleRenderer(item, props);
};

export const directoryButtonsRenderer = () => null;

export const defaultContainerRenderer = (row) => row;

export const directoryContentRenderer = ({
  touchable,
  iconRenderer,
  titleRenderer,
  buttonsRenderer,
  itemRenderer,
  emptyRenderer,
  containerRenderer,
  contentRenderer,
  getItemType,
  content,
}) => {
  return (
    <Files
      items={content}
      touchable={touchable}
      getItemType={getItemType}
      iconRenderer={iconRenderer}
      titleRenderer={titleRenderer}
      buttonsRenderer={buttonsRenderer}
      itemRenderer={itemRenderer}
      emptyRenderer={emptyRenderer}
      containerRenderer={containerRenderer}
      contentRenderer={contentRenderer}
      style={folderRowStyles.contents}
    />
  );
};

// Files list renderers

export const filesItemRenderer = (item, index, props) => {
  const { getItemType } = props;
  let style;
  let Component;
  let even = !(index % 2);

  switch (getItemType(item)) {
    case FILE_TYPE:
      Component = FileRow;
      style = even ? filesStyles.fileEven : filesStyles.fileOdd;
      break;
    case DIRECTORY_TYPE:
      Component = DirectoryRow;
      style = even ? filesStyles.folderEven : filesStyles.folderOdd;
      break;
    default:
      return <Text>Entity of unknown type received.</Text>;
  }

  return <Component {...props} style={style} key={item.name || index} item={item} />;
};

export const filesEmptyRenderer = () => (
  <Text style={filesStyles.emptyText}>No files created yet.</Text>
);
