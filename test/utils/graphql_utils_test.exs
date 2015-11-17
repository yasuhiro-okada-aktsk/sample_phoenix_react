defmodule SamplePhoenixReactApp.GraphQlUtilsTest do
  use ExUnit.Case, async: true

  alias SamplePhoenixReactApp.GraphQlUtils

  test "unsupported kind" do
    graphql = [kind: :unsupported, loc: [], name: "test"]
    normalized = GraphQlUtils.test_normalize graphql

    assert normalized == [kind: :unsupported, name: "test"]
  end

  test "field" do
    graphql = [kind: :Field, loc: [], name: "test"]
    normalized = GraphQlUtils.test_normalize graphql

    assert normalized == [field: "test"]
  end

  test "fields" do
    graphql = [
      [kind: :Field, loc: [], name: "test1"],
      [kind: :Field, loc: [], name: "test2"]
    ]
    normalized = GraphQlUtils.test_normalize graphql

    assert normalized == [[field: "test1"], [field: "test2"]]
  end

  test "selectionSet" do
    graphql =
      [kind: :SelectionSet, loc: [],
        selections: [
          [kind: :Field, loc: [], name: "test1"],
          [kind: :Field, loc: [], name: "test2"]
        ]
      ]
    normalized = GraphQlUtils.test_normalize graphql

    assert normalized == [[field: "test1"], [field: "test2"]]
  end

  test "InlineFragment" do
    graphql = [kind: :InlineFragment, loc: [],
      typeCondition: [kind: :NamedType, loc: [], name: 'RssFeed'],
      selectionSet: [kind: :SelectionSet, loc: [],
        selections: [[kind: :Field, loc: [], name: 'test1'], [kind: :Field, loc: [], name: 'test2']]
      ]
    ]

    normalized = GraphQlUtils.test_normalize graphql

    assert normalized == [[field: "test1"], [field: "test2"]]
  end

  test "normalize_debug" do
    graphql = [
      [kind: :Field, loc: [], name: 'test1'],
      [kind: :Field, loc: [], name: 'test2']
    ]
    normalized = GraphQlUtils.test_normalize_debug graphql

    assert normalized == [[kind: :Field, name: "test1"], [kind: :Field, name: "test2"]]
  end
end
