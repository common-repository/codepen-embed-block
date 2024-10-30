const { __ } = wp.i18n;
const { InspectorControls } = wp.editor;
const { TextControl, ToggleControl, SelectControl } = wp.components;

export default function formFields(attributes, setAttributes) {
  const { penHeight, penType, clickToLoad, penTheme, editable } = attributes;

  const penTypeOptions = [
    { value: "result", label: __("Result only") },
    { value: "html,result", label: __("HTML and result") },
    { value: "js,result", label: __("JavaScript and result") },
    { value: "css,result", label: __("CSS and result") },
  ];

  return (
    <InspectorControls>
      <TextControl
        label={__("Pen Height (in pixels)")}
        onChange={(value) =>
          setAttributes({ penHeight: Number.parseInt(value, 10) })
        }
        value={penHeight}
        type="number"
      />
      <TextControl
        label={__("Pen Theme ID")}
        select={penTheme}
        onChange={(value) => setAttributes({ penTheme: value })}
        value={penTheme}
        help="You can use 'light' and 'dark' also"
      />
      <SelectControl
        label={__("Pen View")}
        select={penType}
        options={penTypeOptions}
        onChange={(value) => setAttributes({ penType: value })}
        value={penType}
      />
      <ToggleControl
        label={__("Use click-to-load (increases performance)")}
        checked={!!clickToLoad}
        onChange={() => setAttributes({ clickToLoad: !clickToLoad })}
      />
      <ToggleControl
        label={__("Editable? (decreases performance, but becomes live editor)")}
        checked={!!editable}
        onChange={() => setAttributes({ editable: !editable })}
      />
    </InspectorControls>
  );
}
