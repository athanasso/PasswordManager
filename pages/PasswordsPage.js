import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import Password from '../components/Password';
import PasswordModal from '../components/PasswordModal';
import { getAllPasswords, deletePassword } from '../helpers/helper';
import { BlurView } from 'expo-blur';
import { useIsFocused } from '@react-navigation/native';

export default function PasswordsPage({ navigation }) {
    const [passwords, setPasswords] = useState([]);
    const [clickedPassword, setClickedPassword] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const isFocused = useIsFocused();
    
    const getPasswords = async () => {
        try {
            const response = await getAllPasswords();
            console.log('Response from getAllPasswords:', response); 
            if (response && Array.isArray(response.credentials)) {
                setPasswords(response.credentials);
            } else {
                setPasswords([]);
            }
        } catch (error) {
            console.error('Failed to fetch passwords:', error);
            setPasswords([]);
        }
    };

    const handleClickDelete = async (password) => {
        await deletePassword(password.id);
        getPasswords();
    };

    useEffect(() => {
        (async () => {
            setIsEditing(false);
            getPasswords();
        })();
    }, [isFocused]);

    const renderPasswords = () => {
        return passwords.map(password => (
            <Password
                key={password.id}
                service={password.service}
                password={password.password}
                isEditing={isEditing}
                handleClick={() => setClickedPassword(password)}
                handleClickDelete={() => handleClickDelete(password)}
            />
        ));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Button title="Sort" />
                <Button title="Edit" onPress={() => setIsEditing(!isEditing)} />
                <Button title="Add" onPress={() => navigation.navigate('Add Password')} />
            </View>
            <ScrollView style={styles.listContainer}>
                {passwords.length === 0
                    ? <Text style={styles.textEmptyList}>No passwords added</Text>
                    : renderPasswords()
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
