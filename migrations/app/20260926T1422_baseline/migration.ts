#!/usr/bin/env -S node
import type { Contract as End } from "../../snapshots/6f7dd5f84cab6fa6bcf8cf27e89551cbeda77271ee8db55c5f1604610449f321/contract";
import endContract from "../../snapshots/6f7dd5f84cab6fa6bcf8cf27e89551cbeda77271ee8db55c5f1604610449f321/contract.json" with { type: "json" };
import {
  Migration,
  MigrationCLI,
  col,
  fn,
  primaryKey,
} from "@prisma/orm-postgres/migration";

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: "public" }),
      this.createTable({
        schema: "public",
        table: "users",
        columns: [
          col("created_at", "timestamptz", {
            notNull: true,
            default: fn("now()"),
            codecRef: { codecId: "pg/timestamptz-temporal@1" },
          }),
          col("email", "text", {
            notNull: true,
            codecRef: { codecId: "pg/text@1" },
          }),
          col("id", "text", {
            notNull: true,
            codecRef: { codecId: "pg/text@1" },
          }),
          col("password", "text", {
            notNull: true,
            codecRef: { codecId: "pg/text@1" },
          }),
          col("updated_at", "timestamptz", {
            notNull: true,
            codecRef: { codecId: "pg/timestamptz-temporal@1" },
          }),
        ],
        constraints: [primaryKey(["id"])],
      }),
      this.addUnique({
        schema: "public",
        table: "users",
        constraint: "users_email_key",
        columns: ["email"],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
