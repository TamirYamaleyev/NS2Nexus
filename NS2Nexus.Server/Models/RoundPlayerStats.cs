using NS2Nexus.Server.DAL.Interfaces;
using System;
using System.Collections.Generic;

namespace NS2Nexus.Server.Models;

public partial class RoundPlayerStats : IEntityBase
{
    public int Id { get; set; }

    public int RoundId { get; set; }

    public int PlayerId { get; set; }

    public int TeamNumber { get; set; }

    public int Hits { get; set; }

    public int Kills { get; set; }

    public int Misses { get; set; }

    public int Assists { get; set; }

    public int Deaths { get; set; }

    public double TimePlayed { get; set; }

    public double CommanderTime { get; set; }

    public int Score { get; set; }

    public double TimeBuilding { get; set; }

    public int OnosHits { get; set; }

    public double PlayerDamage { get; set; }

    public double StructureDamage { get; set; }

    public virtual Player Player { get; set; } = null!;

    public virtual RoundInfo Round { get; set; } = null!;
}
