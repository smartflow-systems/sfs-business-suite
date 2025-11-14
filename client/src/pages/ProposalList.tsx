import { useState } from "react";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, Search, FileEdit, Calendar } from "lucide-react";

const proposals = [
  {
    id: "PROP-001",
    title: "Website Redesign Project",
    client: "Acme Corp",
    value: "$15,000",
    createdDate: "2024-01-10",
    status: "approved" as const,
  },
  {
    id: "PROP-002",
    title: "Mobile App Development",
    client: "TechStart Inc",
    value: "$45,000",
    createdDate: "2024-01-12",
    status: "pending" as const,
  },
  {
    id: "PROP-003",
    title: "Brand Identity Package",
    client: "Global Solutions",
    value: "$8,500",
    createdDate: "2024-01-08",
    status: "draft" as const,
  },
  {
    id: "PROP-004",
    title: "E-commerce Platform",
    client: "Innovate LLC",
    value: "$32,000",
    createdDate: "2024-01-05",
    status: "rejected" as const,
  },
];

export default function ProposalList() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProposals = proposals.filter(
    (proposal) =>
      proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold font-heading" data-testid="text-proposals-title">
            Proposals
          </h1>
          <p className="text-muted-foreground mt-1">Create and manage your business proposals</p>
        </div>
        <Button data-testid="button-create-proposal">
          <Plus className="h-4 w-4 mr-2" />
          Create Proposal
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search proposals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
          data-testid="input-search-proposals"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredProposals.map((proposal) => (
          <Card
            key={proposal.id}
            className="hover-elevate cursor-pointer"
            data-testid={`card-proposal-${proposal.id}`}
          >
            <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-4">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <FileEdit className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium text-muted-foreground">{proposal.id}</p>
                </div>
                <h3 className="text-lg font-semibold font-heading">{proposal.title}</h3>
              </div>
              <StatusBadge status={proposal.status} />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-muted-foreground">Client</p>
                  <p className="font-medium">{proposal.client}</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground">Value</p>
                  <p className="font-semibold text-lg font-heading">{proposal.value}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>Created {proposal.createdDate}</span>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" data-testid={`button-edit-${proposal.id}`}>
                  Edit
                </Button>
                <Button size="sm" className="flex-1" data-testid={`button-view-${proposal.id}`}>
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProposals.length === 0 && (
        <div className="text-center py-12">
          <FileEdit className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No proposals found</h3>
          <p className="text-muted-foreground">Try adjusting your search or create a new proposal</p>
        </div>
      )}
    </div>
  );
}
