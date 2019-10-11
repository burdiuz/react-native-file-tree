import { StyleSheet } from 'react-native';

export const fileRowStyles = StyleSheet.create({
  icon: {
    paddingTop: 3,
    marginRight: 5,
  },
  title: {
    color: 0xccccccff,
  },
  container: {
    flex: 1,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
});

export const folderRowStyles = StyleSheet.create({
  icon: StyleSheet.flatten([fileRowStyles.icon, {}]),
  title: StyleSheet.flatten([fileRowStyles.title, {}]),
  container: StyleSheet.flatten([fileRowStyles.container, {}]),
  contents: {
    //marginBottom: 5,
  },
  counter: {
    color: 0x505050ff,
  },
});

export const filesStyles = StyleSheet.create({
  files: {},
  emptyText: {
    flex: 1,
    margin: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  fileEven: StyleSheet.flatten([fileRowStyles.container, { paddingLeft: 16 }]),
  fileOdd: StyleSheet.flatten([
    fileRowStyles.container,
    {
      paddingLeft: 16,
      backgroundColor: 0xffffff11,
    },
  ]),
  folderEven: StyleSheet.flatten([
    folderRowStyles.container,
    {
      paddingLeft: 16,
    },
  ]),
  folderOdd: StyleSheet.flatten([
    folderRowStyles.container,
    {
      paddingLeft: 16,
      backgroundColor: 0xffffff11,
    },
  ]),
});
