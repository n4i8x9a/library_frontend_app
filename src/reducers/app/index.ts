
const InitialState={title:'',windowSize:{width:window.innerWidth,height:window.innerHeight}};

export default function appReducer(state = InitialState, action:any) {
    switch (action.type) {
        case 'TITLE_UPDATE':
            return {...state,title:action.payload.title}

        case 'WINDOW_RESIZE':
            return {...state,windowSize:{width:action.payload.width,height:action.payload.height}}
        default:
            return state
    }
}