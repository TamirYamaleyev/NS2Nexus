using NS2Nexus.Server.DAL.Interfaces;
using System;
using System.Collections.Generic;

namespace NS2Nexus.Server.Models;

public partial class RoundInfo : IEntityBase
{
    public int Id { get; set; }

    public string ServerName { get; set; } = null!;

    public int MapId { get; set; }

    public int GameMode { get; set; }

    public int RoundDate { get; set; }

    public double RoundLength { get; set; }

    public int? WinningSide { get; set; }

    public bool? PlayedStatus { get; set; }

    public virtual ICollection<ClassPlaytime> ClassPlaytimes { get; set; } = new List<ClassPlaytime>();

    public virtual GameModes? GameModeNavigation { get; set; }

    public virtual ICollection<KillFeed> KillFeeds { get; set; } = new List<KillFeed>();

    public virtual Maps? Map { get; set; }

    public virtual ICollection<RoundPlayerStats> RoundPlayerStats { get; set; } = new List<RoundPlayerStats>();
}
