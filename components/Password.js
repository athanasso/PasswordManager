import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import ConfirmModal from './ConfirmModal'

export default function Password({ siteId, password, isEditing, handleClick, handleClickDelete }) {
    const [clickedDelete, setClickedDelete] = useState()

    const handleClickConfirm = () => {
      handleClickDelete(siteId)
      setClickedDelete(false)
    }

    return (
      <TouchableOpacity onPress={handleClick}>
          {clickedDelete && <ConfirmModal siteId={siteId} handleClickOutside={() => setClickedDelete(false)} clickedConfirm={handleClickConfirm} />}

          <View style={styles.container}>

              <Text style={styles.siteId}>{siteId}</Text>
              {/*<Text style={styles.password}>{'•'.repeat(password.length)}</Text>*/}
              {isEditing && <Button title="Delete" onPress={() => setClickedDelete(true)} />}
          </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 100,
        borderBottomWidth: 1,
        borderColor: '#CCCCCC',
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20
    },
    siteId: {
      fontSize: 30
    },
    password: {
      fontSize: 45,
      letterSpacing: -8,
    },
    button: {
      marginLeft: 'auto'
    }
});
