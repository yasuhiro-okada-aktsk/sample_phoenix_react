defmodule SamplePhoenixReactApp.Mixfile do
  use Mix.Project

  def project do
    [app: :sample_phoenix_react,
     version: "0.0.2",
     elixir: "~> 1.0",
     elixirc_paths: elixirc_paths(Mix.env),
     compilers: [:phoenix] ++ Mix.compilers,
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     aliases: aliases,
     deps: deps]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [mod: {SamplePhoenixReactApp, []},
     applications: [:phoenix, :phoenix_html, :cowboy, :logger, :httpoison,
                    :phoenix_ecto, :mariaex, :timex, :tzdata]]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "web", "test/support"]
  defp elixirc_paths(_),     do: ["lib", "web"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [{:phoenix, "~> 1.0.3"},
     {:phoenix_ecto, "~> 1.1"},
     {:mariaex, ">= 0.0.0"},
     {:phoenix_html, "~> 2.1"},
     {:phoenix_live_reload, "~> 1.0", only: :dev},
     {:cowboy, "~> 1.0"},
     {:guardian, "~> 0.6.2"},
     {:comeonin, "~> 1.2.2"},
     {:httpoison, "~> 0.7.4"},
     {:feeder_ex, ">= 0.0.0"},
     {:timex, "~> 0.19.5"},
     {:timex_ecto, "~> 0.5.0"},
     {:exrm, "~> 0.19.9"}]
  end

  # Aliases are shortcut or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    ["ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
     "ecto.reset": ["ecto.drop", "ecto.setup"]]
  end
end
