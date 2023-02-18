import { useContext, useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Button from '../../components/Button';
import EditableText from '../../components/EditableText';
import { TextInput } from 'react-native-paper';
import { supabase } from '../../initSupabase';
import { SessionContext } from '../../Context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
type ProfileData = {
  username: string;
  avatar_url: string;
} | null;

export default function Profile() {
  const {user} = useContext(SessionContext);
  const [name, setName] = useState(user?.name ||'');
  const [profileUrl, setProfileUrl] = useState(user.profileUrl || '');
  const [showProfileUrl, setShowProfileUrl] = useState(false);

  const logout = async () => {
    console.log('Log out button pressed');
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
  };
  const updateUserProfile = async () => {
    console.log('Updating user profile');
    await supabase.from('profiles').upsert({
      id: user.id,
      username: name,
      avatar_url: profileUrl,
    });
    // setForceProfileUpdate((prev) => !prev);
  };
  useEffect(() => {
  //  setProfileData()
  setProfileUrl(user.avatar_url);
  setName(user.username);
  }, [user]);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowProfileUrl((prev) => !prev)}>
        {user?.avatar_url ? (
          <Image
            source={{ uri: user.avatar_url }}
            style={styles.image}
          />
        ) : (
          <MaterialCommunityIcons name="account" size={100} style={styles.image}/>
        )}
      </TouchableOpacity>

      {showProfileUrl && (
        <EditableText
          textStyle={styles.nameText}
          value={profileUrl}
          label="Paste profile url"
          onChangeText={setProfileUrl}
          right={
            <TextInput.Icon
              name="check"
              onPress={updateUserProfile}
              style={{ justifyContent: 'center', alignSelf: 'center' }}
            />
          }
          initialIsEditable
        />
      )}
      <Text style={styles.text}>{user?.email}</Text>
      <EditableText
        textStyle={styles.nameText}
        value={name}
        label="Edit username"
        onChangeText={setName}
        right={
          <TextInput.Icon
            name="check"
            onPress={updateUserProfile}
            style={{ justifyContent: 'center', alignSelf: 'center' }}
          />
        }
      />
      <Text>{JSON.stringify(user, null, 2)}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 17,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
