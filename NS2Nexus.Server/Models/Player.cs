using NS2Nexus.Server.DAL.Interfaces;
using System;
using System.Collections.Generic;

namespace NS2Nexus.Server.Models;

public partial class Player : IEntityBase
{
    public int Id { get; set; }

    public string PlayerName { get; set; } = null!;

    public string? ProfilePictureUrl { get; set; }

    public int SteamId { get; set; }

    public string? DiscordTag { get; set; }

    public virtual ICollection<ClassPlaytime> ClassPlaytimes { get; set; } = new List<ClassPlaytime>();

    public virtual ICollection<KillFeed> KillFeedKillers { get; set; } = new List<KillFeed>();

    public virtual ICollection<KillFeed> KillFeedVictims { get; set; } = new List<KillFeed>();

    public virtual ICollection<PlayerStats> PlayerStats { get; set; } = new List<PlayerStats>();

    public virtual ICollection<RoundPlayerStats> RoundPlayerStats { get; set; } = new List<RoundPlayerStats>();

    public virtual ICollection<User> User { get; set; } = new List<User>();
}
