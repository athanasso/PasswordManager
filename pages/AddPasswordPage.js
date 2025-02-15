import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Button, KeyboardAvoidingView } from 'react-native';
import TextInputBox from '../components/TextInputBox';
import { addPassword } from '../helpers/helper';

export default function AddPasswordPage({ navigation }) {
    const [service, setService] = useState('');
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);

    const handleSubmit = async () => {
        if(service.trim() === '' || loginId.trim() === '' || password.trim() === '') {
            setErrorMessage('Invalid input');
        } else {
            await addPassword(service, loginId, password);
            navigation.goBack(null);
        }
    }

    return (
        <KeyboardAvoidingView behavior="padding">
            <ScrollView contentContainerStyle={styles.container}>
                <View>
                    <Text style={styles.title}>Add Password</Text>
                </View>
                <TextInputBox label="Service" onChangeText={(text) => setService(text)} handleSubmit={handleSubmit} />
                <TextInputBox label="Login ID" onChangeText={(text) => setLoginId(text)} handleSubmit={handleSubmit} />
                <TextInputBox label="Password" onChangeText={(text) => setPassword(text)} handleSubmit={handleSubmit} />
                <Button 
                    title="Submit"
                    color="#2196f3"
                    onPress={handleSubmit}
                    disabled={service === '' || loginId === '' || password === ''}
                />
                {errorMessage && <Text>{errorMessage}</Text>}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 25,
        margin: 30,
    },
});
