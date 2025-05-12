import { Popover, ColorPicker, Card } from "@shopify/polaris";
import React from "react";

export default function Colorpicker({ active, activator, onClose, color, onChange, name }) {
  return (
    <Popover  active={active} activator={activator} onClose={onClose}>
        <Card>
            <ColorPicker name={name} onChange={onChange} color={color} allowAlpha />
        </Card>
    </Popover>
  );
}
