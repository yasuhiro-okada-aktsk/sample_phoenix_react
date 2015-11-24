defmodule SamplePhoenixReactApp.GraphQl.FragmentTest do
  use ExUnit.Case, async: true

  alias SamplePhoenixReactApp.GraphQl

  test "collect none" do
    graphql = [
      [kind: :Field, loc: [], name: 'test1'],
      [kind: :Field, loc: [], name: 'test2']
    ]
    fragments = GraphQl.Fragment.collect_fragment(graphql)

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

    fragments = GraphQl.Fragment.collect_fragment(graphql)

    assert map_size(fragments) == 1
    assert Map.get(fragments, "__RelayQueryFragment024i1nd") != nil
  end

  test "spread" do
    graphql = [
      [kind: :FragmentSpread, loc: [], name: 'frag1'],
      [kind: :FragmentDefinition, loc: [], name: 'frag1', selectionSet: ["spreaded"]]
    ]
    spreaded = GraphQl.Fragment.spread(graphql)

    assert spreaded == [["spreaded"],nil]
  end

  test "spread2" do
    graphql = [
      [kind: :FragmentSpread, loc: [], name: 'frag1'],
      [kind: :FragmentSpread, loc: [], name: 'frag2'],
      [kind: :FragmentDefinition, loc: [], name: 'frag1', selectionSet: ["spreaded"]],
      [kind: :FragmentDefinition, loc: [], name: 'frag2', selectionSet: ["spreaded2"]]
    ]
    spreaded = GraphQl.Fragment.spread(graphql)

    assert spreaded == [["spreaded"],["spreaded2"],nil,nil]
  end

  test "spread3" do
    graphql = [
      [kind: :FragmentSpread, loc: [], name: 'frag1'],
      [kind: :FragmentDefinition, loc: [], name: 'frag1', selectionSet: [[kind: :FragmentSpread, loc: [], name: 'frag2']]],
      [kind: :FragmentDefinition, loc: [], name: 'frag2', selectionSet: ["spreaded2"]]
    ]
    spreaded = GraphQl.Fragment.spread(graphql)

    assert spreaded == [[["spreaded2"]],nil,nil]
  end

  test "has fragment (no fragment)" do
    graphql = [
      [kind: :FragmentDefinition, loc: [], name: 'frag1', selectionSet: ["spreaded"]],
      [kind: :FragmentDefinition, loc: [], name: 'frag2', selectionSet: ["spreaded2"]]
    ]

    assert not GraphQl.Fragment.has_fragment(graphql)
  end

  test "has fragment" do
    graphql = [
      [kind: :FragmentSpread, loc: [], name: 'frag1'],
      [kind: :FragmentDefinition, loc: [], name: 'frag1', selectionSet: ["spreaded"]],
      [kind: :FragmentDefinition, loc: [], name: 'frag2', selectionSet: ["spreaded2"]]
    ]

    assert GraphQl.Fragment.has_fragment(graphql)
  end

  test "has fragment2" do
    graphql = [
      [kind: :FragmentDefinition, loc: [], name: 'frag1', selectionSet: [[kind: :FragmentSpread, loc: [], name: 'frag2']]],
      [kind: :FragmentDefinition, loc: [], name: 'frag2', selectionSet: ["spreaded2"]]
    ]

    assert GraphQl.Fragment.has_fragment(graphql)
  end
end
