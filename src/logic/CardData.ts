export enum Shape {
    Diamond = 0,
    Squiggle = 1,
    Oval = 2
}

export enum Color {
    Purple = 0,
    Red = 1,
    Green = 2
}

export enum Shading {
    Open = 0,
    Striped = 1,
    Solid = 2
}

export class CardData {
    private color: Color;
    private shape: Shape;
    private number: number;
    private shading: Shading;

    constructor(color: Color, shape: Shape, number: number, shading: Shading) {
        this.color = color;
        this.shape = shape;
        this.number = number;
        this.shading = shading;
    }

    public getColor(): Color {
        return this.color;
    }

    public getShape(): Shape {
        return this.shape;
    }

    public getNumber(): number {
        return this.number;
    }

    public getShading(): Shading {
        return this.shading;
    }

    // Convert enum values to strings (keys)
    public colorToString(): string {
        return Color[this.color].toLowerCase();  
    }

    public shapeToString(): string {
        return Shape[this.shape].toLowerCase(); 
    }

    public shadingToString(): string {
        return Shading[this.shading].toLowerCase(); 
    }

    
}