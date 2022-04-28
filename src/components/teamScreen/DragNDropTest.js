import React from 'react';
import { View, Text } from 'react-native';
import { DraxProvider, DraxScrollView, DraxView } from 'react-native-drax';

const items = ['one', 'two', 'three', 'four'];

const DragNDropTest = () => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      <DraxProvider>
        <View />
        <DraxScrollView
          contentContainerStyle={{
            paddingBottom: 200,
          }}
          style={{
            minHeight: '100%',
          }}
        >
          {/* If this second DraxScrollView is switched to ScrollView then the drop works but then horizontal autoscroll doesn't work */}
          <DraxScrollView
            contentContainerStyle={{
              minWidth: '100%',
              minHeight: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
            style={{
              minHeight: '100%',
            }}
            horizontal
          >
            <DraxView
              style={{
                height: 100,
                width: 100,
                borderWidth: 2,
              }}
              receivingStyle={{ backgroundColor: 'blue' }}
              onReceiveDragEnter={() =>
                console.log('has entered top drop zone')
              }
            />
            <DraxView
              style={{
                height: 500,
                width: 500,
                borderWidth: 2,
                margin: 10,
              }}
              onStartShouldSetResponder={() => true}
            >
              {items.map((item, index) => (
                <DraxView
                  key={index}
                  style={{
                    height: 90,
                    width: 90,
                    backgroundColor: 'red',
                    marginTop: 10,
                  }}
                  onDragStart={() => console.log('has started')}
                >
                  <Text>{item}</Text>
                </DraxView>
              ))}
            </DraxView>
            {/* This last DraxView is the one that does not behave as expected, if the screen has been scrolled vertically */}
            <DraxView
              style={{
                height: 100,
                width: 100,
                borderWidth: 2,
              }}
              receivingStyle={{ backgroundColor: 'blue' }}
              onReceiveDragEnter={() =>
                console.log('has entered bottom drop zone')
              }
            />
            <View />
          </DraxScrollView>
        </DraxScrollView>
      </DraxProvider>
    </View>
  );
};

export default DragNDropTest;
