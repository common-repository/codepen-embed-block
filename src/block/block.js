/**
 * BLOCK: codepen-gutenberg-embed-block
 */

import icons from "../utils/getIcon.js";
import formFields from "./settings.js";
import getPenHTML from "../utils/getPenHTML.js";
import getPenID from "../utils/getPenID.js";

const { __ } = wp.i18n;
const { registerBlockType, createBlock } = wp.blocks;
const { TextControl } = wp.components;

registerBlockType("cp/codepen-gutenberg-embed-block", {
  title: __("CodePen Embed"),

  icon: icons.codepen,

  category: "embed",

  keywords: [__("CodePen"), __("Code"), __("Embed")],

  attributes: {
    content: {
      type: "string",
      default: "",
    },
    penURL: {
      type: "string",
      default: "",
    },
    penID: {
      type: "string",
      default: "",
    },
    penType: {
      type: "string",
      default: "result",
    },
    penHeight: {
      type: "integer",
      default: 450,
    },
    penTheme: {
      type: "string",
      default: "1",
    },
    clickToLoad: {
      type: "boolean",
      default: false,
    },
    editable: {
      type: "boolean",
      default: false,
    },
  },

  supports: { html: true },

  transforms: {
    from: [
      {
        type: "raw",
        priority: 8,
        isMatch: (node) =>
          node.nodeName === "P" && node.className === "codepen",
        transform: function (node) {
          let penURL = node.querySelector("a").getAttribute("href");

          return createBlock("cp/codepen-gutenberg-embed-block", {
            penURL: penURL,
            penID: getPenID(penURL),
          });
        },
      },
      {
        type: "raw",
        priority: 8,
        isMatch: (node) =>
          node.nodeName === "P" &&
          node.innerText.startsWith("https://codepen.io/"),

        transform: function (node) {
          return createBlock("cp/codepen-gutenberg-embed-block", {
            penURL: node.innerText,
            penID: getPenID(node.innerText),
          });
        },
      },
    ],
  },

  edit({ attributes, setAttributes, isSelected }) {
    const { penURL } = attributes;
    return [
      !!isSelected && formFields(attributes, setAttributes),
      <TextControl
        key="penURL-input"
        style={{
          textAlign: "center",
          border: "solid 1px rgba(100,100,100,0.25)",
        }}
        onChange={(value) =>
          setAttributes({ penURL: value, penID: getPenID(value) })
        }
        value={penURL}
        placeholder={__("Enter a Pen URL...")}
        label={null}
      />,
      penURL === "" || !penURL.length ? (
        <div className="error">
          <p style={{ textAlign: "center" }}>
            {__("A Pen URL is required. Please enter one in the field above.")}
          </p>
        </div>
      ) : (
        getPenHTML(attributes)
      ),
    ];
  },

  save({ attributes }) {
    return getPenHTML(attributes);
  },
});
