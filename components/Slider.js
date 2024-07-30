import React from 'react';
import Carousel from 'react-native-banner-carousel';
import { StyleSheet, Image, View, Dimensions } from 'react-native';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;

const images = [
    "https://visio.edu.vn/wp-content/uploads/2021/10/Banner-sa%CC%81ch_1920_tinified.jpg",
    "https://png.pngtree.com/thumb_back/fh260/back_our/20190620/ourmid/pngtree-cartoon-dream-reading-life-change-poster-background-material-image_151816.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiiGFWwr8I7Fbfut-23g5mCStood_uUZU3Mw&s"
];

export default class Slider extends React.Component {
    renderPage(image, index) {
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: image }} />
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Carousel
                
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={BannerWidth}
                >
                    {images.map((image, index) => this.renderPage(image, index))}
                </Carousel>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
});