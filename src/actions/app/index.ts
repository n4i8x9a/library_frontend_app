export function updateTitleAction(title:string)
{
    return {type:"TITLE_UPDATE",payload:{title:title}}
}

export function windowResizeAction()
{
    return {type:'WINDOW_RESIZE',payload:{width:window.innerWidth,height:window.innerHeight}};
}