
const InitialState={title:''};

export default function appReducer(state = InitialState, action:any) {
    switch (action.type) {
        case 'TITLE_UPDATE':
            return {...state,title:action.payload.title}
        default:
            return state
    }
}