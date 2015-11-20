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
end
