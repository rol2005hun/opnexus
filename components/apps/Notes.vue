<template>
  <div class="app-notes">
    <div class="notes-header">
      <h2>📝 Case Notes - The Whistleblower Investigation</h2>
      <div class="notes-meta">
        <span class="case-id">Case ID: NX-2025-001</span>
        <span class="classification">Classification: Confidential</span>
      </div>
    </div>

    <div class="notes-content">
      <div class="investigation-brief">
        <h3>🎯 Mission Briefing</h3>
        <p>
          Welcome to your first case at NEXUS Digital Investigation Agency. You've been assigned to investigate
          an internal security breach at <strong>Meridian Financial Corp</strong>.
        </p>

        <h4>📋 Case Summary</h4>
        <p>
          Someone inside the company is leaking confidential financial documents to unknown parties.
          The leaked information includes client data, merger plans, and sensitive trading strategies that
          could cause significant market disruption if made public.
        </p>

        <h4>🔍 Your Objectives</h4>
        <ul>
          <li>Identify the internal source of the leak</li>
          <li>Determine the method of data exfiltration</li>
          <li>Gather evidence of unauthorized access</li>
          <li>Trace communication channels used for the breach</li>
        </ul>

        <h4>💡 Investigation Tips</h4>
        <div class="tips-grid">
          <div class="tip">
            <span class="tip-icon">📧</span>
            <div>
              <strong>Check Email Patterns</strong>
              <p>Look for unusual email timing, recipients, and attachment patterns</p>
            </div>
          </div>

          <div class="tip">
            <span class="tip-icon">💬</span>
            <div>
              <strong>Analyze Messages</strong>
              <p>Internal communications might reveal coordination between parties</p>
            </div>
          </div>

          <div class="tip">
            <span class="tip-icon">🔍</span>
            <div>
              <strong>Cross-Reference Evidence</strong>
              <p>Use the Evidence Locker to connect different pieces of information</p>
            </div>
          </div>
        </div>

        <h4>⚠️ Warning</h4>
        <div class="warning-box">
          <p>
            This investigation is time-sensitive. The longer the breach continues,
            the more damage could be done to Meridian Financial and their clients.
            Proceed with discretion and thoroughness.
          </p>
        </div>

        <h4>📝 Investigation Log</h4>
        <div class="log-entry">
          <strong>Day 1 - Initial Assessment:</strong><br>
          Security team detected unusual data access patterns. Multiple confidential files
          accessed outside normal business hours. Employee badge logs show potential discrepancies.
        </div>

        <div class="log-entry">
          <strong>Current Status:</strong><br>
          You have access to employee email accounts, internal messaging systems, and file access logs.
          Begin your investigation by examining communication patterns and identifying suspicious activities.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
@use "sass:color";

.app-notes {
  height: 100%;
  background: $window-bg;
  overflow-y: auto;
}

.notes-header {
  background: $bg-secondary;
  padding: 1.5rem;
  border-bottom: 2px solid $accent-blue;

  h2 {
    margin: 0 0 1rem 0;
    color: $text-primary;
    font-size: 1.4rem;
  }

  .notes-meta {
    display: flex;
    gap: 2rem;
    font-size: 0.9rem;
    color: $text-muted;

    .case-id {
      font-weight: bold;
      color: $accent-orange;
    }

    .classification {
      color: $accent-red;
      font-weight: bold;
    }
  }
}

.notes-content {
  padding: 2rem;
}

.investigation-brief {
  h3 {
    color: $accent-blue;
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }

  h4 {
    color: $text-primary;
    margin: 2rem 0 1rem 0;
    font-size: 1.1rem;
    border-left: 4px solid $accent-blue;
    padding-left: 1rem;
  }

  p {
    line-height: 1.6;
    color: $text-secondary;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.5rem;
      color: $text-secondary;

      &::before {
        content: "▶";
        position: absolute;
        left: 0;
        color: $accent-blue;
      }
    }
  }

  strong {
    color: $accent-orange;
  }
}

.tips-grid {
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;

  .tip {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: $bg-secondary;
    border-radius: 8px;
    border-left: 4px solid $accent-green;

    .tip-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    strong {
      color: $text-primary;
      display: block;
      margin-bottom: 0.5rem;
    }

    p {
      margin: 0;
      font-size: 0.9rem;
      color: $text-muted;
    }
  }
}

.warning-box {
  background: color.adjust($accent-red, $alpha: -0.9);
  border: 1px solid $accent-red;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 2rem;

  p {
    margin: 0;
    color: $text-primary;
    font-weight: 500;
  }
}

.log-entry {
  background: $bg-secondary;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  border-left: 3px solid $accent-orange;

  strong {
    color: $accent-orange;
  }

  br+text {
    color: $text-secondary;
  }
}
</style>
