import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import ErrorPage from './ErrorPage'
import Password from '../components/Password'
import PasswordModal from '../components/PasswordModal'
import { getAllPasswords, deletePassword } from '../helpers/helper'
import { BlurView } from 'expo-blur';
import { useIsFocused } from '@react-navigation/native'

export default function PasswordsPage({ navigation }) {
    const [secureStoreAvailable, setSecureStoreAvailable] = useState()
    const [passwords, setPasswords] = useState()
    const [clickedPassword, setClickedPassword] = useState()
    const [isEditing, setIsEditing] = useState(false)

    const isFocused = useIsFocused()
    
    const getPasswords = async () => setPasswords(await getAllPasswords())

    const handleClickDelete = async siteId => {
        await deletePassword(siteId)
        getPasswords()
    }

    useEffect(() => {
        (async () => {
            const isAvailable = await SecureStore.isAvailableAsync()
            setSecureStoreAvailable(isAvailable)
            if(isAvailable) {
                setIsEditing(false)
                getPasswords()
            }
        })();
    }, [isFocused])

    if(!secureStoreAvailable) {
        return <ErrorPage message="Device not compatible" />
    }

    else if(passwords === undefined) {
        return <ErrorPage message="Loading"/>
    }

    return (
        <View style={styles.container}>
                <View style={styles.header}>
                    <Button title="Sort" />
                    <Button title="Edit" onPress={() => setIsEditing(!isEditing)}/>
                    <Button title="Add" onPress={() => navigation.navigate('Add Password')}/>
                </View>
                <ScrollView style={styles.listContainer}>
                    {!passwords
                        ? <Text style={styles.textEmptyList}>No passwords added</Text>
                        : passwords.map(password => <Password key={password.siteId} siteId={password.siteId} password={password.password} isEditing={isEditing} handleClick={() => setClickedPassword(password)} handleClickDelete={handleClickDelete}/>)
                    }
                </ScrollView>
            {clickedPassword &&
                <BlurView intensity={80} tint={'light'} onPress={() => setClickedPassword(undefined)} style={[StyleSheet.absoluteFill, styles.nonBlurredContent]}>
                    <PasswordModal loginId={clickedPassword.loginId} password={clickedPassword.password} handleClickOutside={() => setClickedPassword(undefined)} />
                </BlurView>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#CCCCCC',
        padding: 10
    },
    textEmptyList: {
        fontSize: 35,
        color: '#c9c9c9',
        alignSelf:'center',
        marginTop: '50%'
    },
    listContainer: {
        width: '100%'
    },
});
