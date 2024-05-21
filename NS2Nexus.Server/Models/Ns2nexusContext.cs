using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace NS2Nexus.Server.Models;

public partial class Ns2nexusContext : DbContext
{
    public Ns2nexusContext()
    {
    }

    public Ns2nexusContext(DbContextOptions<Ns2nexusContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ClassPlaytime> ClassPlaytimes { get; set; }

    public virtual DbSet<GameModes> GameModes { get; set; }

    public virtual DbSet<KillFeed> KillFeeds { get; set; }

    public virtual DbSet<Lifeforms> Lifeforms { get; set; }

    public virtual DbSet<Maps> Maps { get; set; }

    public virtual DbSet<Player> Players { get; set; }

    public virtual DbSet<PlayerStats> PlayerStats { get; set; }

    public virtual DbSet<RoundInfo> RoundInfos { get; set; }

    public virtual DbSet<RoundPlayerStats> RoundPlayerStats { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserTypes> UserTypes { get; set; }

    public virtual DbSet<Weapons> Weapons { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=DESKTOP-J4NPN92;Initial Catalog=NS2Nexus;Integrated Security=True;Trust Server Certificate=True;Encrypt=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ClassPlaytime>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__classPla__3213E83F905319C2");

            entity.ToTable("classPlaytime");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.ClassId).HasColumnName("classId");
            entity.Property(e => e.PlayTime).HasColumnName("playTime");
            entity.Property(e => e.PlayerId).HasColumnName("playerId");
            entity.Property(e => e.RoundId).HasColumnName("roundId");

            entity.HasOne(d => d.Class).WithMany(p => p.ClassPlaytimes)
                .HasForeignKey(d => d.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__classPlay__class__7C4F7684");

            entity.HasOne(d => d.Player).WithMany(p => p.ClassPlaytimes)
                .HasForeignKey(d => d.PlayerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__classPlay__playe__01142BA1");

            entity.HasOne(d => d.Round).WithMany(p => p.ClassPlaytimes)
                .HasForeignKey(d => d.RoundId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__classPlay__round__00200768");
        });

        modelBuilder.Entity<GameModes>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__gameMode__3213E83FCA0B5D0B");

            entity.ToTable("gameModes");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.GameModeName)
                .HasMaxLength(1)
                .HasColumnName("gameModeName");
        });

        modelBuilder.Entity<KillFeed>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__killFeed__3213E83FF7B94C62");

            entity.ToTable("killFeed");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.KillerId).HasColumnName("killerId");
            entity.Property(e => e.KillerLifeformId).HasColumnName("killerLifeformId");
            entity.Property(e => e.KillerTeamNumber).HasColumnName("killerTeamNumber");
            entity.Property(e => e.KillerWeaponId).HasColumnName("killerWeaponId");
            entity.Property(e => e.RoundId).HasColumnName("roundId");
            entity.Property(e => e.VictimId).HasColumnName("victimId");
            entity.Property(e => e.VictimLifeformId).HasColumnName("victimLifeformId");

            entity.HasOne(d => d.Killer).WithMany(p => p.KillFeedKillers)
                .HasForeignKey(d => d.KillerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__killFeed__killer__75A278F5");

            entity.HasOne(d => d.KillerLifeform).WithMany(p => p.KillFeedKillerLifeforms)
                .HasForeignKey(d => d.KillerLifeformId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__killFeed__killer__778AC167");

            entity.HasOne(d => d.KillerWeapon).WithMany(p => p.KillFeeds)
                .HasForeignKey(d => d.KillerWeaponId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__killFeed__killer__72C60C4A");

            entity.HasOne(d => d.Round).WithMany(p => p.KillFeeds)
                .HasForeignKey(d => d.RoundId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__killFeed__roundI__797309D9");

            entity.HasOne(d => d.Victim).WithMany(p => p.KillFeedVictims)
                .HasForeignKey(d => d.VictimId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__killFeed__victim__76969D2E");

            entity.HasOne(d => d.VictimLifeform).WithMany(p => p.KillFeedVictimLifeforms)
                .HasForeignKey(d => d.VictimLifeformId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__killFeed__victim__787EE5A0");
        });

        modelBuilder.Entity<Lifeforms>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__lifeform__3213E83F78932258");

            entity.ToTable("lifeforms");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.LifeformName)
                .HasMaxLength(1)
                .HasColumnName("lifeformName");
        });

        modelBuilder.Entity<Maps>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__maps__3213E83F7B3B0FB3");

            entity.ToTable("maps");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.MapName)
                .HasMaxLength(1)
                .HasColumnName("mapName");
        });

        modelBuilder.Entity<Player>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__player__3213E83F9446C284");

            entity.ToTable("player");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.DiscordTag)
                .HasMaxLength(1)
                .HasColumnName("discordTag");
            entity.Property(e => e.PlayerName)
                .HasMaxLength(1)
                .HasColumnName("playerName");
            entity.Property(e => e.ProfilePictureUrl)
                .HasMaxLength(1)
                .HasColumnName("profilePictureURL");
            entity.Property(e => e.SteamId)
                .HasMaxLength(1)
                .HasColumnName("steamId");
        });

        modelBuilder.Entity<PlayerStats>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__playerSt__3213E83F36E48099");

            entity.ToTable("playerStats");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Adagrad).HasColumnName("adagrad");
            entity.Property(e => e.AlienAccuracy).HasColumnName("alienAccuracy");
            entity.Property(e => e.AlienKdr).HasColumnName("alienKDR");
            entity.Property(e => e.CommAdagrad).HasColumnName("commAdagrad");
            entity.Property(e => e.CommanderSkill).HasColumnName("commanderSkill");
            entity.Property(e => e.CommanderSkillAlien).HasColumnName("commanderSkillAlien");
            entity.Property(e => e.CommanderSkillMarine).HasColumnName("commanderSkillMarine");
            entity.Property(e => e.HiveSkill).HasColumnName("hiveSkill");
            entity.Property(e => e.HiveSkillAlien).HasColumnName("hiveSkillAlien");
            entity.Property(e => e.HiveSkillMarine).HasColumnName("hiveSkillMarine");
            entity.Property(e => e.MarineAccuracy).HasColumnName("marineAccuracy");
            entity.Property(e => e.MarineKdr).HasColumnName("marineKDR");
            entity.Property(e => e.PlayerId).HasColumnName("playerId");
            entity.Property(e => e.PlayerSkillOffset).HasColumnName("playerSkillOffset");

            entity.HasOne(d => d.Player).WithMany(p => p.PlayerStats)
                .HasForeignKey(d => d.PlayerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__playerSta__playe__7D439ABD");
        });

        modelBuilder.Entity<RoundInfo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__roundInf__3213E83F67D57ECD");

            entity.ToTable("roundInfo");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.GameMode).HasColumnName("gameMode");
            entity.Property(e => e.MapId).HasColumnName("mapId");
            entity.Property(e => e.PlayedStatus).HasColumnName("playedStatus");
            entity.Property(e => e.RoundDate).HasColumnName("roundDate");
            entity.Property(e => e.RoundLength).HasColumnName("roundLength");
            entity.Property(e => e.ServerName)
                .HasMaxLength(1)
                .HasColumnName("serverName");
            entity.Property(e => e.WinningSide).HasColumnName("winningSide");

            entity.HasOne(d => d.GameModeNavigation).WithMany(p => p.RoundInfos)
                .HasForeignKey(d => d.GameMode)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__roundInfo__gameM__74AE54BC");

            entity.HasOne(d => d.Map).WithMany(p => p.RoundInfos)
                .HasForeignKey(d => d.MapId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__roundInfo__mapId__73BA3083");
        });

        modelBuilder.Entity<RoundPlayerStats>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__roundPla__3213E83F06B15074");

            entity.ToTable("roundPlayerStats");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Assists).HasColumnName("assists");
            entity.Property(e => e.CommanderTime).HasColumnName("commanderTime");
            entity.Property(e => e.Deaths).HasColumnName("deaths");
            entity.Property(e => e.Hits).HasColumnName("hits");
            entity.Property(e => e.Kills).HasColumnName("kills");
            entity.Property(e => e.Misses).HasColumnName("misses");
            entity.Property(e => e.OnosHits).HasColumnName("onosHits");
            entity.Property(e => e.PlayerDamage).HasColumnName("playerDamage");
            entity.Property(e => e.PlayerId).HasColumnName("playerId");
            entity.Property(e => e.RoundId).HasColumnName("roundId");
            entity.Property(e => e.Score).HasColumnName("score");
            entity.Property(e => e.StructureDamage).HasColumnName("structureDamage");
            entity.Property(e => e.TeamNumber).HasColumnName("teamNumber");
            entity.Property(e => e.TimeBuilding).HasColumnName("timeBuilding");
            entity.Property(e => e.TimePlayed).HasColumnName("timePlayed");

            entity.HasOne(d => d.Player).WithMany(p => p.RoundPlayerStats)
                .HasForeignKey(d => d.PlayerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__roundPlay__playe__7B5B524B");

            entity.HasOne(d => d.Round).WithMany(p => p.RoundPlayerStats)
                .HasForeignKey(d => d.RoundId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__roundPlay__round__7A672E12");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__user__3213E83FC0EE9F48");

            entity.ToTable("user");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Email)
                .HasMaxLength(1)
                .HasColumnName("email");
            entity.Property(e => e.Password)
                .HasMaxLength(1)
                .HasColumnName("password");
            entity.Property(e => e.PlayerId).HasColumnName("playerId");
            entity.Property(e => e.UserTypeId).HasColumnName("userTypeId");
            entity.Property(e => e.Username)
                .HasMaxLength(1)
                .HasColumnName("username");

            entity.HasOne(d => d.Player).WithMany(p => p.User)
                .HasForeignKey(d => d.PlayerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__user__playerId__7E37BEF6");

            entity.HasOne(d => d.UserType).WithMany(p => p.Users)
                .HasForeignKey(d => d.UserTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__user__userTypeId__7F2BE32F");
        });

        modelBuilder.Entity<UserTypes>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__userType__3213E83F4C016400");

            entity.ToTable("userTypes");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.UserType)
                .HasMaxLength(1)
                .HasColumnName("userType");
        });

        modelBuilder.Entity<Weapons>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__weapons__3213E83FDB05C0D9");

            entity.ToTable("weapons");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.WeaponName)
                .HasMaxLength(1)
                .HasColumnName("weaponName");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
