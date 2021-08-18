import * as PIXI from "pixi.js"



const BASE_WIDTH = 1000;
const BASE_HEIGHT = 1000;

class CurrentObjectEdtior extends PIXI.Container{
    constructor(app){
        super();
        this.app = app;
        this.currentObject = null;
        this.currentPixiElement = null;
        this.zIndex = 10;
        //this.graphic = this.createGraphic();
         
    }

    createGraphic = () => {
        var container = new PIXI.Container();
        var graphics = new PIXI.Graphics();
 
     
 
        // set the line style to have a width of 5 and set the color to red
        graphics.lineStyle(5, 0xFF0000);
 
        // draw a rectangle
        graphics.drawRect(0, 0, BASE_WIDTH, BASE_HEIGHT);
        container.addChild(graphics)
        graphics.zIndex = 10;
        var texture = this.app.renderer.generateTexture(graphics);
        var sprite = new PIXI.Sprite(texture);
        sprite.zIndex = 10;
        //circle.renderable = false;
        return sprite;
    }

    getGraphic = () => {
        return this.graphic;
    }


    setCurrentObject = (object, elements) => {
        console.log("set current object")
        console.log(object)
        this.currentObject = object;
       

        this.currentPixiElement = object ? elements[object.id] : null; 
    }


    onRotationStart = (event) => {

    }

    onRotationMove = (event) => {

    }

    onRotationEnd = (event) => {
        
    }


    renderUI(){
        // update position 
        return;

        this.removeChildren();
        if(!this.currentObject) return

        const el = this.currentPixiElement;

        const graphic = new PIXI.Graphics();
        graphic.lineStyle(3, 0xFF0000);
        graphic.drawRect(el.x - 2 - el.width/2, el.y - 2 - el.height /2, el.width+4, el.height+4);
       


        const circleOne = new PIXI.Graphics()
        circleOne.beginFill(0x000000);
        circleOne.drawCircle(el.x - 2 - el.width/2, el.y - 2 - el.height /2,6)


        const circleTwo = new PIXI.Graphics()
        circleTwo.beginFill(0x000000);
        circleTwo.drawCircle(el.x - 2 - 100, el.y - 2 - el.height /2,6)
        circleTwo.
        on('mousedown', this.onRotationStart)
        .on('touchstart', this.onRotationStart)
        .on('mouseup', this.onRotationEnd)
        .on('mouseupoutside', this.onRotationEnd)
        .on('touchend', this.onRotationEnd)
        .on('touchendoutside', this.onRotationEnd)
        .on('mousemove', this.onRotationMove)
        .on('touchmove', this.onRotationMove)



        this.addChild(graphic, circleOne,circleTwo)



        
    }
}



export default CurrentObjectEdtior;