import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { ImageSlider } from 'react-native-image-slider-banner';

const { width } = Dimensions.get('window');

const Slider = () => {
    return (
        <View style={styles.container}>
            <ImageSlider
                data={[
                    { img: 'https://visio.edu.vn/wp-content/uploads/2021/10/Banner-sa%CC%81ch_1920_tinified.jpg' },
                    { img: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg' },
                    { img: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg' }
                ]}
                autoPlay={true}
                onItemChanged={(item) => (item)}
                closeIconColor="#fff"
                preview={false}
                caroselImageStyle={styles.image}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: width,
        height: 220, 
        resizeMode: 'cover'
    }
});

export default Slider;
