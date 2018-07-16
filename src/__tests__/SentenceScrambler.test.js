import React from "react";
import { configure } from "enzyme";
import SentenceScrambler from "../components/SentenceScrambler";
import { createShallow } from "@material-ui/core/test-utils";

import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("SentenceScrambler methods", () => {
  test("SentenceScrambler can not rescramble with no input", () => {
    // const component =
    let shallow = createShallow();
    const scrambler = shallow(<SentenceScrambler />);

    expect(
      scrambler
        .dive()
        .instance()
        .canRescramble()
    ).toBeFalsy();
  });
});
