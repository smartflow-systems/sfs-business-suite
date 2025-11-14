import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, ArrowRight, ArrowLeft, FileSignature } from "lucide-react";

const STEPS = [
  { id: 1, title: "Client Details", description: "Basic information about your client" },
  { id: 2, title: "Project Information", description: "Details about the project scope" },
  { id: 3, title: "Sign Agreement", description: "Review and sign the service agreement" },
  { id: 4, title: "Complete", description: "Onboarding complete!" },
];

export default function ClientOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSigning, setIsSigning] = useState(false);

  const progress = (currentStep / STEPS.length) * 100;

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
      console.log("Next step:", currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      console.log("Previous step:", currentStep - 1);
    }
  };

  const handleSignature = () => {
    setIsSigning(true);
    setTimeout(() => {
      setIsSigning(false);
      handleNext();
      console.log("Signature captured");
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-heading" data-testid="text-onboarding-title">
          Client Onboarding
        </h1>
        <p className="text-muted-foreground mt-2">Welcome your new client to your services</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Step {currentStep} of {STEPS.length}</span>
          <span className="text-muted-foreground">{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} data-testid="progress-onboarding" />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {STEPS.map((step) => (
          <div
            key={step.id}
            className={`text-center p-2 rounded-md transition-colors ${
              step.id === currentStep
                ? "bg-primary text-primary-foreground"
                : step.id < currentStep
                ? "bg-chart-3/10 text-chart-3"
                : "bg-muted text-muted-foreground"
            }`}
            data-testid={`step-indicator-${step.id}`}
          >
            {step.id < currentStep ? (
              <CheckCircle2 className="h-5 w-5 mx-auto" />
            ) : (
              <div className="text-sm font-semibold">{step.id}</div>
            )}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading">{STEPS[currentStep - 1].title}</CardTitle>
          <CardDescription>{STEPS[currentStep - 1].description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" placeholder="Acme Corp" data-testid="input-company-name" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Contact Name</Label>
                  <Input id="contact-name" placeholder="John Doe" data-testid="input-contact-name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="john@acme.com"
                    data-testid="input-contact-email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" data-testid="input-phone" />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  placeholder="Website Redesign"
                  data-testid="input-project-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-scope">Project Scope</Label>
                <Textarea
                  id="project-scope"
                  placeholder="Describe the project scope and deliverables..."
                  rows={6}
                  data-testid="textarea-project-scope"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget</Label>
                  <Input id="budget" placeholder="$10,000" data-testid="input-budget" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline</Label>
                  <Input id="timeline" placeholder="3 months" data-testid="input-timeline" />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="p-6 border rounded-md bg-muted/50 space-y-4">
                <h3 className="font-semibold font-heading">Service Agreement</h3>
                <p className="text-sm text-muted-foreground">
                  This agreement outlines the terms and conditions of our services. By signing below,
                  you agree to the terms specified in this document.
                </p>
                <div className="border-t pt-4 space-y-2 text-sm">
                  <p>
                    <strong>Service Provider:</strong> BizFlow Business Manager
                  </p>
                  <p>
                    <strong>Client:</strong> [Client Name]
                  </p>
                  <p>
                    <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="border-2 border-dashed rounded-md p-8 text-center space-y-4">
                <FileSignature className="h-12 w-12 mx-auto text-muted-foreground" />
                <div>
                  <h4 className="font-semibold mb-1">Sign Agreement</h4>
                  <p className="text-sm text-muted-foreground">
                    Click below to provide your digital signature
                  </p>
                </div>
                <Button onClick={handleSignature} disabled={isSigning} data-testid="button-sign">
                  {isSigning ? "Signing..." : "Sign Document"}
                </Button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center py-8 space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-chart-3/10 p-4">
                  <CheckCircle2 className="h-16 w-16 text-chart-3" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-heading mb-2">Onboarding Complete!</h3>
                <p className="text-muted-foreground">
                  Your client has been successfully onboarded. You can now start managing their
                  projects and invoices.
                </p>
              </div>
              <Button size="lg" data-testid="button-go-to-dashboard">
                Go to Dashboard
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {currentStep < 4 && (
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            data-testid="button-previous"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button onClick={handleNext} disabled={currentStep === 3} data-testid="button-next">
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
