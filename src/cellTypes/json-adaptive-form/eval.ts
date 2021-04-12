/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/* Adapted from jsconsole, MIT licensed */

import { Cell } from "../../types";
import { promiseState } from './util';

import * as ACData from "adaptivecards-templating";

declare global {
  interface Window {
    $_: any;
    eval: (command: string) => any;
    runtime: any;
  }
}

interface RunResult {
  error: boolean;
  code: string;
  value?: any;
}

export class AdaptiveCardTemplateEvaluator {

  public async run(cell: Cell): Promise<RunResult> {

    const res: RunResult = {
      error: false,
      code: cell.textContent,
    };

    var code = cell.textContent;

    try {
      // // trick from devtools
      // // via https://chromium.googlesource.com/chromium/src.git/+/4fd348fdb9c0b3842829acdfb2b82c86dacd8e0a%5E%21/#F2
      if (/^\s*\{/.test(code) && /\}\s*$/.test(code)) {
        code = `(${code})`;
      }

      const codeToRun = `${code}`;

      if (!window) {
        res.error = true;
        res.value = "Run error: container or window is null";
        return res;
      }

      var templatePayload = JSON.parse(cell.textContent);

      // Create a Template instance from the template payload
      var template = new ACData.Template(templatePayload);

      var previousResult = window.runtime.controls.previousResponse(cell.id);
      if (!previousResult) {
        previousResult = {};
      }

      var state = cell.state || previousResult;

      // Create a data binding context, and set its $root property to the
      // data object to bind the template to
      var context: ACData.IEvaluationContext = {
        $root: state
      };

      // "Expand" the template - this generates the final Adaptive Card,
      // ready to render
      var card = template.expand(context);

      var newState = this.extractValues(card, state);
      if(newState != undefined) cell.state = newState;

      res.value = card;
      cell.response = newState;
      (window)["$_"] = res.value;
      return res;

    } catch (error) {
      cell.response = undefined;
      res.error = true;
      res.value = error;
      return res;
    }
  }

  public extractValues(card: any, request: any): any {

    var values: any = {};

    card.body.forEach((element: any, index: any) => {
      this.parseElement(element, request, values);
    });

    // return undefined when no values are found
    if (Object.keys(values).length == 0) values = undefined;

    return values;
  }


  private parseElement(element: any, request: any, values: any) {

    this.applyValue(element, request, values);

    switch (element.type) {

      case 'Column':
      case 'Container':
        element.items.forEach((element: any, index: any) => {
          this.parseElement(element, request, values);
        });
        break;

      case 'ColumnSet':
        element.columns.forEach((element: any, index: any) => {
          this.parseElement(element, request, values);
        });
        break;

      case 'FactSet':
        if (Array.isArray(element.facts)) {
          element.facts.forEach((element: any, index: any) => {
            this.parseElement(element, request, values);
          });
        }
        break;
    }
  }


  private applyValue(element: any, defaultValues: any, values: any): void {

    let value = element.value;
    let type = element.type;
    let id = element.id;

    // replace card value with default value
    if (id && defaultValues[id] != undefined) {
      value = defaultValues[id];
      element.value = value;
    }

    if (type === 'Input.Toggle') {
      if (value !== undefined) {
        if (value === 'true') value = true;
        if (value === 'false') value = false;
      } else {
        value = false;
      }
      element.value = value ? 'true' : 'false';
    }

    if (id) {
      if (value != undefined) {
        values[id] = value;
      } else {
        delete values[id];
      }
    }
  }
}
