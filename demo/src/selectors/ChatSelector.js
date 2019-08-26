import { createSelector } from 'reselect'
import _ from 'lodash'

const chatType = {
    contact: 'chat',
    group: 'groupchat',
    chatroom: 'chatroom',
    stranger: 'stranger'
}

const getTabMessageArray = (state, props) => {
    const { selectTab, selectItem } = props.match.params
    var msgByItem = _.get(state, [ 'entities', 'message', chatType[selectTab], selectItem ])
    return msgByItem
}

const getTabMessageArray2 = (state, props) =>{
    const { selectTab, selectItem } = props.match.params
    var msgByMid = _.get(state, [ 'entities', 'message', 'byMid' ])
    return msgByMid
}


const getTabMessages = createSelector(
    [ getTabMessageArray,  getTabMessageArray2 ],
    (TabMessageArray, TabMessageArray2) => {
        return { TabMessageArray, TabMessageArray2 }
    }
)

export default getTabMessages