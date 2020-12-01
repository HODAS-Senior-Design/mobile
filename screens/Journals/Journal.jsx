import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import {
  Entypo as EIcon,
  FontAwesome as FAIcon,
  Feather as FEIcon,
} from "@expo/vector-icons/";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
  renderers
} from 'react-native-popup-menu';

import styles from "../../styles/journalStyles";
import { UserContext } from "../../functions/providers/UserContext";
import { color } from "../../functions/providers/ColorContext";
const { SlideInMenu } = renderers;

const dateToMDY = date => {
  let month = date.getUTCMonth() + 1;
  let day = date.getUTCDate();
  let year = date.getUTCFullYear();
  return month + "/" + day + "/" + year;
}

export default function Journal(props) {
  const { navigation } = props;
  const data = navigation.getParam("data");
  const { userID, updateJournal} = useContext(UserContext);

  const [title, setTitle] = useState(data.title);
  const [body, setBody] = useState(data.body);
  const titleRef = useRef(title);
  const bodyRef = useRef(body);

  // Ugly workaround  ¯\_(ツ)_/¯
  useEffect(() => {
    bodyRef.current = body;
  }, [body]);
  useEffect(() => {
    titleRef.current = title;
  }, [title]);


  // Called when Journal is closed
  // componentWillUnmount equivalent https://stackoverflow.com/questions/55139386/componentwillunmount-with-react-useeffect-hook
  useEffect(() => {
      return () => {
        updateJournal(userID, data.id, titleRef.current, bodyRef.current);
      };
  }, [props.current]);

  return (
    <MenuProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ ...styles.container, backgroundColor: color.backgroundColor}}>
          <View style={styles.topnav}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FAIcon name="chevron-left" color={color.inactive} size={32} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("TrackJournal")}
              style={{ marginLeft: 290 }}
            >
              <FEIcon name="smile" color={color.inactive} size={32} />
            </TouchableOpacity>

            <Menu name="numbers" renderer={SlideInMenu} onSelect={value => this.selectNumber(value)}>
              <MenuTrigger customStyles={{ triggerOuterWrapper: styles.trigger }} >
                <EIcon
                  style={{ marginTop: -5, marginLeft: 10 }}
                  name="dots-three-vertical"
                  size={36}
                  color={color.inactive}
                />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption customStyles={{ optionText: [styles.bluetext] }} value={1} text='Pin' />
                <MenuOption customStyles={{ optionText: [styles.bluetext] }} value={2} text='Lock' />
                <MenuOption customStyles={{ optionText: [styles.bluetext] }} value={3} text='Share' />
                <MenuOption customStyles={{ optionText: [styles.redtext] }} value={4} text='Delete' />
              </MenuOptions>
            </Menu>

          </View>
          <View style={styles.middle}>
            <TextInput
              keyboardType="default"
              placeholder="Journal Entry Title"
              style={{
                fontSize: 28,
                fontWeight: "bold",
              }}
              value={title}
              onChangeText={setTitle}
            />
            <Text style={styles.regtext}>{'Created: ' + dateToMDY(data.timeCreated)}</Text>
            <Text style={styles.regtext}>{'Updated: ' + dateToMDY(data.lastUpdated)}</Text>
          </View>
          <View style={styles.notesui}>
            <TextInput
              keyboardType="default"
              placeholder="Type your journal entry here..."
              multiline={true}
              style={{
                fontSize: 20,
                width: "100%",
                height: "100%",
              }}
              value={body}
              onChangeText={setBody}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

    </MenuProvider>
  );
}
