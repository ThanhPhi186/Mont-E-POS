import React, {useState} from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';

const ImageSvg = ({width, height, url}) => {
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
  *{
      margin: 0;
      padding: 0;
      background-color: #000 !important;
  }
  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  </style>
  </title>
  </head>
  <body>
  <div style="width: ${width}px; height: ${height}px">
  <img src="${url}" style="height:100%;" alt="">
  </div>
  </body>
  </html>
  `;

  const [ended, setEnded] = useState(false);

  return (
    <View style={{width: width, height: height}}>
      <WebView
        style={{backgroundColor: '#000', opacity: ended ? 1 : 0}}
        source={{html}}
        scrollEnabled={false}
        pointerEvents="none"
        onLoadEnd={() => {
          setTimeout(() => {
            setEnded(true);
          }, 100);
        }}
      />
    </View>
  );
};

export default ImageSvg;
