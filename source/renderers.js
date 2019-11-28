import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@actualwave/react-native-kingnare-style';
import FontFamily from 'react-native-vector-icons/FontAwesome';

import { DIRECTORY_TYPE, FILE_TYPE } from './constants';
import { fileRowStyles, folderRowStyles, filesStyles } from './styles';
import FileRow from './FileRow';
import DirectoryRow from './DirectoryRow';
import Files from './Files';

// File renderers

export const fileIconRenderer = () => (
  <FontFamily name="file-text-o" size={20} color="#ccc" style={fileRowStyles.icon} />
);
export const fileTitleRenderer = ({ name }) => <Text style={fileRowStyles.title} numberOfLines={1}>{name}</Text>;
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

  return fileIconRenderer();
};

export const directoryTitleRenderer = (item, props) => {
  const { content, getItemType, contentLength } = props;
  const { name } = item;
  let length = contentLength;
  let counter = null;

  if (Number.isNaN(length) && content) {
    ({ length } = content);
  }

  if (!Number.isNaN(length)) {
    counter = <Text style={folderRowStyles.counter}> ({length || '0'})</Text>;
  }

  if (getItemType(item) === DIRECTORY_TYPE) {
    return (
      <Text style={folderRowStyles.title}>
        {name}
        {counter}
      </Text>
    );
  }

  return fileTitleRenderer(item);
};

export const directoryButtonsRenderer = () => null;

export const defaultContainerRenderer = (row) => row;

export const directoryContentRenderer = ({ content, ...props }) => {
  return <Files {...props} items={content} style={folderRowStyles.contents} />;
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

  return <Component {...props} style={style} key={item.path || item.name || index} item={item} />;
};

export const filesEmptyRenderer = () => (
  <Text style={filesStyles.emptyText}>No files created yet.</Text>
);
