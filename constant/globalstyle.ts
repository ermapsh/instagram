import { StyleSheet } from "react-native";

export const globalStyle = StyleSheet.create({
    flex1: {
        flex: 1
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    flexCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alignItemsCenter: {
        alignItems: 'center'
    },
    justifyContentCenter: {
        justifyContent: 'center'
    },
    alignSelfCenter: {
        alignSelf: 'center'
    },
    justifyContentBetween: {
        justifyContent: 'space-between'
    },
    justifyContentAround: {
        justifyContent: 'space-around'
    },
    justifyContentEvenly: {
        justifyContent: 'space-evenly'
    },
    justifyContentFlexStart: {
        justifyContent: 'flex-start'
    },
    justifyContentFlexEnd: {
        justifyContent: 'flex-end'
    },
    alignItemsFlexStart: {
        alignItems: 'flex-start'
    },
    alignItemsFlexEnd: {
        alignItems: 'flex-end'
    },
    alignItemsStretch: {
        alignItems: 'stretch'
    },
    alignItemsBaseline: {
        alignItems: 'baseline'
    },
})
