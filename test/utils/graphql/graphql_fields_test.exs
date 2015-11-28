defmodule SamplePhoenixReactApp.GraphQlAst.FieldsTest do
  use ExUnit.Case, async: true

  alias SamplePhoenixReactApp.GraphQlAst

  test "remove_duplicated" do
    graphql =
      [kind: SelectionSet, selections: [[kind: Field, name: "a1"], [kind: Field, name: "a2"], [kind: Field, name: "a1"]]]

    removed = GraphQlAst.Fields.remove_duplicated graphql

    assert removed == [kind: SelectionSet, selections: [[kind: Field, name: "a1"], [kind: Field, name: "a2"]]]
  end

  test "remove_duplicated 2" do
    graphql =
      [kind: SelectionSet, selections: [[kind: Field, name: "n2", sectionSet: [
          kind: SelectionSet, selections: [[kind: Field, name: "a1"], [kind: Field, name: "a2"], [kind: Field, name: "a1"]]]]]]

    removed = GraphQlAst.Fields.remove_duplicated graphql

    assert removed == [kind: SelectionSet, selections: [[kind: Field, name: "n2", sectionSet: [
          kind: SelectionSet, selections: [[kind: Field, name: "a1"], [kind: Field, name: "a2"]]]]]]
  end
end
