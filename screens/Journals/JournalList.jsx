import React, { useContext } from "react";
import {
  Text,
  TouchableOpacity,
  FlatList,
  View,
} from "react-native";
import { FontAwesome5 as FA5Icon } from "@expo/vector-icons/";

import { ColorContext } from "../../functions/providers/ColorContext";
import generalStyles from "../../styles/generalStyles";
import styles from "../../styles/journalListStyles";

function dateToDay(date) {
  if (new Date().toDateString() === date.toDateString()) {
    return "Today";
  } else {
    switch (date.getDay()) {
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "Sunday";
    }
  }
}

function dateToMDY(date) {
  let month = date.getUTCMonth() + 1;
  let day = date.getUTCDate();
  let year = date.getUTCFullYear();
  return month + "/" + day + "/" + year;
}

function Entry(props) {
  const { color } = useContext(ColorContext);
  const { data } = props;
  let style = [ {...styles.entry, backgroundColor: color.primary, borderColor: color.inactive}];

  if (props.style === "top") {
    style.push(styles.entryTop);
  } else if (props.style === "bottom") {
    style.push({ ...styles.entryBottom, borderBottomWidth: 0 });
  } else if (props.style === "both") {
    style.push(styles.entryTop);
    style.push(styles.entryBottom);
  }

  let description;
  if (props.private === true) {
    description = "This journal is private.";
  } else if (props.body.length <= 40) {
    description = props.body;
  } else {
    description = props.body.slice(0, 40) + "...";
  }

  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate("Journal", { data })}
      style={[style, styles.entryContent]}
    >
      <View>
        <Text style={ {...styles.entryTitle, color: color.primaryText }}>{props.title}</Text>
        <Text style={{ color: color.inactive}}>{description}</Text>
      </View>
      <FA5Icon name='chevron-right' color={color.inactive} size={36} />
    </TouchableOpacity>
  );
}

function JournalList(props) {
  let journals = props.data;
  const { color } = useContext(ColorContext);

  for (let i = 0; i < journals.length; ++i) {
    // If this is the first entry or its date comes before the previous entry's date
    if (
      i === 0 ||
      journals[i].timeCreated.getTime() !==
        journals[i - 1].timeCreated.getTime()
    ) {
      // If this is the last entry or its date comes before the next entry's date
      if (
        i === journals.length - 1 ||
        journals[i + 1].timeCreated.getTime() !==
          journals[i].timeCreated.getTime()
      ) {
        journals[i].style = "both";
      } else {
        journals[i].style = "top";
      }
      // Otherwise, if this is the last entry or its date comes before the next entry's date
    } else if (
      i === journals.length - 1 ||
      journals[i + 1].timeCreated.getTime() !==
        journals[i].timeCreated.getTime()
    ) {
      journals[i].style = "bottom";
    }
  }

  let data = [];

  for (entry of journals) {
    if (
      data.length === 0 ||
      data[data.length - 1][0].timeCreated.getTime() !==
        entry.timeCreated.getTime()
    ) {
      data.push([entry]);
    } else {
      data[data.length - 1].push(entry);
    }
  }

  return (
    <FlatList
      data={data}
      style={styles.topList}
      contentContainerStyle={styles.entryList}
      keyExtractor={(item) => item[0].timeCreated.toString() + item[0].id}
      renderItem={({ item }) => (
        <View>
          <Text
            style={{
              margin: 4,
              fontFamily: "medium",
              color: color.primaryText,
              fontSize: 16,
            }}
          >
            <Text>
              {dateToDay(item[0].timeCreated)}
              {"  "}
            </Text>
            <Text style={{ color: color.inactive, fontSize: 14 }}>
              {dateToMDY(item[0].timeCreated)}
            </Text>
          </Text>
          <FlatList
            style={generalStyles.shadow}
            data={item}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Entry
                title={item.title}
                body={item.body}
                private={item.private}
                navigation={props.navigation}
                style={item.style}
                data={item}
              />
            )}
          />
        </View>
      )}
    />
  );
}

export default JournalList;
