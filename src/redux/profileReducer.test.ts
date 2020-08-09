import profileReducer, {actions} from "./profileReducer";
import {render} from "@testing-library/react";
import App from "../App";
import React from "react";
import {ProfileType} from "../types/Types";

let state =  {
    posts: [
        {id: 1, message: "hiiii", likesCount: 11},
        {id: 2, message: "huuuuuuu", likesCount: 13},
    ],
    profile: null,
    status: "",
    // newPostText: ""
};

test('length of posts should be incremented', () => {
    //1 test data
    let action = actions.addPostAC("new text");

    //2 action
    let newState = profileReducer(state, action);

    //3 expectation
    expect(newState.posts.length).toBe(3);
});

test('message of new post should be correct', () => {
    //1 test data
    let action = actions.addPostAC("new text");

    //2 action
    let newState = profileReducer(state, action);

    //3 expectation
    expect(newState.posts[2].message).toBe("new text");
});

test('after deleting length of messages should be decrement', () => {
    //1 test data
    let action = actions.deletePostAC(1);

    //2 action
    let newState = profileReducer(state, action);

    //3 expectation
    expect(newState.posts.length).toBe(1);
});

test(`after deleting length shouldn't be decrement if id is incorrect`, () => {
    //1 test data
    let action = actions.deletePostAC(1000);

    //2 action
    let newState = profileReducer(state, action);

    //3 expectation
    expect(newState.posts.length).toBe(2);
});