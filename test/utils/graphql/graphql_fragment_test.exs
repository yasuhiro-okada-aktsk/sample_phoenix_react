defmodule SamplePhoenixReactApp.GraphQlAst.FragmentTest do
  use ExUnit.Case, async: true

  alias SamplePhoenixReactApp.GraphQlAst

  test "collect none" do
    graphql = [
      [kind: :Field, loc: [], name: 'test1'],
      [kind: :Field, loc: [], name: 'test2']
    ]
    fragments = GraphQlAst.Fragment.collect_fragment(graphql)

    assert fragments == %{}
  end

  test "collect" do
    graphql = [kind: :Document, loc: [start: 0], definitions: [[kind: :OperationDefinition, loc: [start: 0],
      operation: :query, name: 'AppHomeRoute', selectionSet: [kind: :SelectionSet, loc: [start: 0],
      selections: [[kind: :Field, loc: [start: 0], name: 'feeds', arguments: [[kind: :Argument, loc: [start: 0],
      name: 'count', value: [kind: :IntValue, loc: [start: 0], value: 5]]], selectionSet: [kind: :SelectionSet,
      loc: [start: 0], selections: [[kind: :FragmentSpread, loc: [start: 0], name: '__RelayQueryFragment024i1nd']]]]]]],
      [kind: :FragmentDefinition, loc: [start: 0], name: '__RelayQueryFragment024i1nd',
      typeCondition: [kind: :NamedType, loc: [start: 0], name: 'RssFeed'], selectionSet: [kind: :SelectionSet,
      loc: [start: 0], selections: [[kind: :Field, loc: [start: 0], name: 'id'], [kind: :Field, loc: [start: 0],
      name: 'title'], [kind: :Field, loc: [start: 0], name: 'subtitle'], [kind: :Field, loc: [start: 0],
      name: 'summary']]]]]]

    fragments = GraphQlAst.Fragment.collect_fragment(graphql)

    assert map_size(fragments) == 1
    assert Map.get(fragments, "__RelayQueryFragment024i1nd") != nil
  end

  test "spread" do
    graphql = [
      [kind: :FragmentDefinition, name: "f", selectionSet: [selections: ["s1", "s2"]]],
      [kind: :FragmentSpread, name: "f"]
    ]
    spreaded = GraphQlAst.Fragment.spread(graphql)

    assert spreaded == [nil, "s1", "s2"]
  end

  test "spread2" do
    graphql = [
      [kind: :FragmentDefinition, name: "f", selectionSet: [selections: ["s1", "s2"]]],
      ["a1", "a2", [kind: :FragmentSpread, name: "f"]]
    ]
    spreaded = GraphQlAst.Fragment.spread(graphql)

    assert spreaded == [nil, ["a1", "a2", "s1", "s2"]]
  end

  test "spread3" do
    graphql = [
      [kind: :FragmentSpread, loc: [], name: 'frag1'],
      [kind: :FragmentSpread, loc: [], name: 'frag2'],
      [kind: :FragmentDefinition, loc: [], name: 'frag1', selectionSet: [selections: ["spreaded"]]],
      [kind: :FragmentDefinition, loc: [], name: 'frag2', selectionSet: [selections: ["spreaded2"]]]
    ]
    spreaded = GraphQlAst.Fragment.spread(graphql)

    assert spreaded == ["spreaded","spreaded2",nil,nil]
  end

  test "spread4" do
    graphql = [
      [kind: :FragmentSpread, loc: [], name: 'frag1'],
      [kind: :FragmentDefinition, loc: [], name: 'frag1', selectionSet: [selections: [[kind: :FragmentSpread, loc: [], name: 'frag2']]]],
      [kind: :FragmentDefinition, loc: [], name: 'frag2', selectionSet: [selections: ["s1", "s2"]]]
    ]
    spreaded = GraphQlAst.Fragment.spread(graphql)

    assert spreaded == ["s1", "s2", nil, nil]
  end

  test "spread5" do
    graphql = [
      [[kind: :Field, name: 'x1'], [kind: :FragmentSpread, name: 'f1']],
      [kind: :FragmentDefinition, name: 'f1', selectionSet: [selections: [[kind: :Field, name: 'a1'], [kind: :Field, name: 'a2'], [kind: :Field, name: 'a3'] ]]],
    ]
    spreaded = GraphQlAst.Fragment.spread(graphql)

    assert spreaded == [[[kind: :Field, name: 'x1'], [kind: :Field, name: 'a1'], [kind: :Field, name: 'a2'], [kind: :Field, name: 'a3']], nil]
  end

  test "has fragment (no fragment)" do
    graphql = [
      [kind: :FragmentDefinition, loc: [], name: 'frag1', selectionSet: ["spreaded"]],
      [kind: :FragmentDefinition, loc: [], name: 'frag2', selectionSet: ["spreaded2"]]
    ]

    assert not GraphQlAst.Fragment.has_fragment(graphql)
  end

  test "has fragment" do
    graphql = [
      [kind: :FragmentSpread, loc: [], name: 'frag1'],
      [kind: :FragmentDefinition, loc: [], name: 'frag1', selectionSet: ["spreaded"]],
      [kind: :FragmentDefinition, loc: [], name: 'frag2', selectionSet: ["spreaded2"]]
    ]

    assert GraphQlAst.Fragment.has_fragment(graphql)
  end

  test "has fragment2" do
    graphql = [
      [kind: :FragmentDefinition, loc: [], name: 'frag1', selectionSet: [[kind: :FragmentSpread, loc: [], name: 'frag2']]],
      [kind: :FragmentDefinition, loc: [], name: 'frag2', selectionSet: ["spreaded2"]]
    ]

    assert GraphQlAst.Fragment.has_fragment(graphql)
  end
end
