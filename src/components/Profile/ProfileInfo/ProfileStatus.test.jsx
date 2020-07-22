import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("Profile status component", () => {

    test("status in props should be in th state", () => {
        //create виртуально рендерит компоненту (без браузера)
        const component = create(<ProfileStatus status="test text status" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("test text status");
    });

    test("after creation <span> should be displayed with correct status", () => {
        //create виртуально рендерит компоненту (без браузера)
        const component = create(<ProfileStatus status="test text status" />);
        const root = component.root;
        const span = root.findByType("span");
        expect(span.length).not.toBeNull();
    });

    test("after creation <input> shouldn't be displayed", () => {
        //create виртуально рендерит компоненту (без браузера)
        const component = create(<ProfileStatus status="test text status" />);
        const root = component.root;
        expect(() => {
            let input = root.findByType("input");
        }).toThrow();
    });

    test("after creation <span> should contains correct status", () => {
        //create виртуально рендерит компоненту (без браузера)
        const component = create(<ProfileStatus status="test text status" />);
        const root = component.root;
        const span = root.findByType("span");
        expect(span.children[0]).toBe("test text status");
    });

    test("input should be displayed in editMode instead of span", () => {
        //create виртуально рендерит компоненту (без браузера)
        const component = create(<ProfileStatus status="test text status" />);
        const root = component.root;
        const span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("test text status");
    });

    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status="test text status" updateStatus={ mockCallback } />);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});