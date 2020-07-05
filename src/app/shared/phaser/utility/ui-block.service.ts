import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})


// tslint:disable-next-block: variable-name
export class UiBlockService {
  childIndex: number;
  children: any;
  oldX: any;
  oldY: any;
  // tslint:disable-next-line: variable-name
  _depth: any;
  private _visible: boolean;
  _displayHeight: number;
  _displayWidth: number;
  isPosBlock: boolean;
  _alpha: number;

  // getters
get x(): any {
  return this.x;
}


set x(val) {
  // record the current x into oldX
  this.oldX = this.x;
  //
  // update the value
  this.x = val;
  //
  // update the children
  this.updatePositions();
}

get y(): any {
  return this.y;
}


set y(val) {
  // record the current y into oldY
  this.oldY = this.y;
  //
  // update the value
  this.y = val;
  // update the children
  this.updatePositions();
}


get depth(): any {
  return this._depth;
}

set depth(val) {
  // console.log(val);
  this._depth = val;
  if (this.children.length > 0) {
    this.setChildDepth(this.children[0]);
  }
}


  constructor() {
    // init private variables
    this.x = 0;
    this.y = 0;
    //
    //
    // keep track of this block's previous position
    this.oldX = 0;
    this.oldY = 0;
    //
    //
    this._visible = true;
    //
    //
    // needs to be set by developer
    this._displayWidth = 0;
    this._displayHeight = 0;
    //
    //
    // an array of the children
    this.children = [];
    // current child count
    // used for indexing
    this.childIndex = -1;
    //
    // used to identify this as a UIBlock to another UIBlock
    this.isPosBlock = true;
    this._depth = 1;
    this._alpha = 1;
  }

  

  setChildDepth(child): void {
    let gw: any;
    // console.log(child);
    const realDepth = this._depth * 100 + child.childIndex;
    console.log(realDepth);
    if (child.scene === undefined) {
      child.scene = gw.model.currentScene;
    }
    child.depth = realDepth;
    //  child.setDepth(realDepth);
    if (child.nextChild !== null) {
      this.setChildDepth(child.nextChild);
    }
  }

  // add a child
  add(child): void {
    // up the index
    this.childIndex++;
    // make a note of the index inside the child
    child.childIndex = this.childIndex;
    // add to the array
    this.children.push(child);
    // build the linked list
    this.buildList();
  }
  /* removeAvatar(userID) {
    if (this.avatars[userID]) {
        var avatar = this.avatars[userID];
        if (avatar.prevAvatar) avatar.prevAvatar.nextAvatar = avatar.nextAvatar;
        avatar.destroy();
        delete this.avatars[userID];
    }
}*/
  removeChild(child): void {
    // take the child off the array based on index
    this.children.splice(child.childIndex, 1);

    //
    // rebuild the linked list
    this.buildList();
    // rebuild the indexes
    const len = this.children.length;
    for (let i = 0; i < len; i++) {
      this.children[i].childIndex = i;
    }
    // set the childIndex to the length of the array
    this.childIndex = len;
  }
  buildList(): any {
    const len = this.children.length;
    if (len > 1) {
      for (let i = 1; i < len; i++) {
        // set the current child to the previous child's nextChild property
        this.children[i - 1].nextChild = this.children[i];
      }
    }
    this.children[len - 1].nextChild = null;
  }
  willRender(): any {}

  get displayWidth(): any {
    return this._displayWidth;
  }

  get displayHeight(): any {
    return this._displayHeight;
  }

  setSize(w, h): void {
    this._displayWidth = w;
    this._displayHeight = h;
  }
  setXY(x, y): void {
    this.x = x;
    this.y = y;
    this.updatePositions();
  }
  set visible(val) {
    if (this._visible !== val) {
      this._visible = val;
      if (this.children.length > 0) {
        // send the first child to the updateChildVisible function
        this.updateChildVisible(this.children[0], val);
      }
    }
  }
  get visible(): any {
    return this._visible;
  }
  //
  //
  //
  //
  set alpha(val) {
    if (this._alpha !== val) {
      this._alpha = val;
      if (this.children.length > 0) {
        // send the first child to the updateChildalpha function
        this.updateChildAlpha(this.children[0], val);
      }
    }
  }
  get alpha(): any {
    return this._alpha;
  }
  setScrollFactor(scroll): any {
    // setScrollFactor
    if (this.children.length > 0) {
      // send the first child to the updateChildalpha function
      this.updateChildScroll(this.children[0], scroll);
    }
  }
  updateChildScroll(child, scroll): any {
    child.setScrollFactor(scroll);
    if (child.nextChild) {
      child.nextChild.setScrollFactor(scroll);
    }
  }
  updateChildAlpha(child, alpha): any {
    child.alpha = alpha;
    if (child.isPosBlock === true) {
      child.alpha = alpha;
    }
    if (child.nextChild !== null) {
      // if the child has a nextChild call this function recursively
      this.updateChildAlpha(child.nextChild, alpha);
    }
  }
  updateChildVisible(child, vis): any {
    child.visible = vis;
    if (child.isPosBlock === true) {
      child.visible = vis;
    }
    if (child.nextChild !== null) {
      // if the child has a nextChild call this function recursively
      this.updateChildVisible(child.nextChild, vis);
    }
  }
  updateChildPos(child): any {
    child.y = child.y - this.oldY + this.y;
    child.x = child.x - this.oldX + this.x;
    if (child.isPosBlock === true) {
      child.updatePositions();
    }
    if (child.nextChild !== null) {
      // if the child has a nextChild call this function recursively
      this.updateChildPos(child.nextChild);
    }
    // set the old values to the new
    this.oldX = this.x;
    this.oldY = this.y;
  }
  updatePositions(): any {
    if (this.children) {
      if (this.children.length > 0) {
        // send the first child to the updateChildPos function
        this.updateChildPos(this.children[0]);
      }
    }
  }
  getRelPos(child): any {
    return {
      x: child.x - this.x,
      y: child.y - this.y,
    };
  }
  once(t, e, i): void {}

  getChildren(myArray, child): void {
    myArray.push(child);
    if (child.isPosBlock) {
      if (child.children.length > 0) {
        child.getChildren(myArray, child.children[0]);
      }
    }
    if (child.nextChild) {
      this.getChildren(myArray, child.nextChild);
    }
  }
  getAllChildren(): any {
    const childArray = [];
    if (this.children.length > 0) {
      this.getChildren(childArray, this.children[0]);
    }
    return childArray;
  }

  getChildAt(index): void {
    return this.children[index];
  }

  setMask(mask): void {
    this.getAllChildren().forEach(
       (child: any) => {
        child.setMask(mask);
      }
      // .bind(this)
    );
  }
  destroy(): void {
    const childArray = this.getAllChildren();
    this.childIndex = -1;
    // console.log(childArray);
    const len = childArray.length;
    for (let i = 0; i < len; i++) {
      childArray[i].destroy();
    }
    this.children.length = 0;
    childArray.length = 0;
  }
}
