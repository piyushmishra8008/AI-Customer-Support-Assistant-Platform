import {
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

import DashboardLayout from
"../layouts/DashboardLayout";

import StatCard from
"../components/StatCard";

const Analytics = () => {

  const [analytics,
    setAnalytics] =
      useState(null);

  const fetchAnalytics =
    async () => {

      try {

        const res =
          await api.get(
            "/analytics/dashboard"
          );

        setAnalytics(
          res.data.analytics
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchAnalytics();

  }, []);

  if (!analytics) {

    return (
      <DashboardLayout>
        Loading...
      </DashboardLayout>
    );

  }

  return (
    <DashboardLayout>

      <h1 className="text-3xl mb-5">
        Analytics
      </h1>

      <div className="grid grid-cols-3 gap-4">

        <StatCard
          title="Conversations"
          value={
            analytics.totalConversations
          }
        />

        <StatCard
          title="Open Tickets"
          value={
            analytics.openTickets
          }
        />

        <StatCard
          title="Resolved Tickets"
          value={
            analytics.resolvedTickets
          }
        />

        <StatCard
          title="Escalated"
          value={
            analytics.escalatedTickets
          }
        />

        <StatCard
          title="AI Resolution Rate"
          value={
            analytics.aiResolutionRate
          }
        />

      </div>

    </DashboardLayout>
  );
};

export default Analytics;