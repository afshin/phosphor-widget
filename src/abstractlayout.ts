/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import {
  Message, sendMessage
} from 'phosphor-messaging';

import {
  Layout
} from './layout';

import {
  ResizeMessage
} from './messages';

import {
  Widget
} from './widget';


/**
 * An abstract base class for creating index-based layouts.
 *
 * #### Notes
 * This class implements core functionality which is required by nearly
 * all layouts. It is a good starting point for creating custom layouts
 * which control the types of children that may be added to the layout.
 *
 * This class must be subclassed to make a fully functioning layout.
 */
export
abstract class AbstractLayout extends Layout {
  /**
   * Get the number of child widgets in the layout.
   *
   * @returns The number of child widgets in the layout.
   *
   * #### Notes
   * This abstract method must be implemented by a subclass.
   */
  abstract childCount(): number;

  /**
   * Get the child widget at the specified index.
   *
   * @param index - The index of the child widget of interest.
   *
   * @returns The child at the specified index, or `undefined`.
   *
   * #### Notes
   * This abstract method must be implemented by a subclass.
   */
  abstract childAt(index: number): Widget;

  /**
   * Get the index of the specified child widget.
   *
   * @param child - The child widget of interest.
   *
   * @returns The index of the specified child, or `-1`.
   */
  childIndex(child: Widget): number {
    for (let i = 0, n = this.childCount(); i < n; ++i) {
      if (this.childAt(i) === child) return i;
    }
    return -1;
  }

  /**
   * Send a message to all children in the layout.
   *
   * @param msg - The message to send to the children.
   */
  protected sendToAllChildren(msg: Message): void {
    for (let i = 0; i < this.childCount(); ++i) {
      sendMessage(this.childAt(i), msg);
    }
  }

  /**
   * Send a message to some children in the layout.
   *
   * @param msg - The message to send to the children.
   *
   * @param pred - A predicate filter function. The message will only
   *   be send to the children which pass the filter.
   */
  protected sendToSomeChildren(msg: Message, pred: (child: Widget) => boolean): void {
    for (let i = 0; i < this.childCount(); ++i) {
      let child = this.childAt(i);
      if (pred(child)) sendMessage(child, msg);
    }
  }

  /**
   * A message handler invoked on a `'resize'` message.
   *
   * #### Notes
   * The default implementation of this method sends an `UnknownSize`
   * resize message to all children.
   *
   * This may be reimplemented by subclasses as needed.
   */
  protected onResize(msg: ResizeMessage): void {
    this.sendToAllChildren(ResizeMessage.UnknownSize);
  }

  /**
   * A message handler invoked on a `'fit-request'` message.
   *
   * #### Notes
   * The default implementation of this method sends an `UnknownSize`
   * resize message to all children.
   *
   * This may be reimplemented by subclasses as needed.
   */
  protected onFitRequest(msg: Message): void {
    this.sendToAllChildren(ResizeMessage.UnknownSize);
  }

  /**
   * A message handler invoked on an `'after-attach'` message.
   *
   * #### Notes
   * The default implementation of this method forwards the message
   * to all children.
   *
   * This may be reimplemented by subclasses as needed.
   */
  protected onAfterAttach(msg: Message): void {
    this.sendToAllChildren(msg);
  }

  /**
   * A message handler invoked on a `'before-detach'` message.
   *
   * #### Notes
   * The default implementation of this method forwards the message
   * to all children.
   *
   * This may be reimplemented by subclasses as needed.
   */
  protected onBeforeDetach(msg: Message): void {
    this.sendToAllChildren(msg);
  }

  /**
   * A message handler invoked on an `'after-show'` message.
   *
   * #### Notes
   * The default implementation of this method forwards the message
   * to all non-hidden children.
   *
   * This may be reimplemented by subclasses as needed.
   */
  protected onAfterShow(msg: Message): void {
    this.sendToSomeChildren(msg, child => !child.isHidden);
  }

  /**
   * A message handler invoked on a `'before-hide'` message.
   *
   * #### Notes
   * The default implementation of this method forwards the message
   * to all non-hidden children.
   *
   * This may be reimplemented by subclasses as needed.
   */
  protected onBeforeHide(msg: Message): void {
    this.sendToSomeChildren(msg, child => !child.isHidden);
  }
}