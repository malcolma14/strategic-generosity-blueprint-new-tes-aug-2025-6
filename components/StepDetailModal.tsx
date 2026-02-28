import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface StepDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  step: {
    id: string;
    title: string;
    status: "completed" | "active" | "upcoming";
    date: string;
    description: string;
    icon: string;
    details?: string[];
    outcome?: string;
    timeframe?: string;
    whatToExpect?: string[];
    testimonial?: {
      quote: string;
      author: string;
      role: string;
    };
  };
}

export function StepDetailModal({ isOpen, onClose, step }: StepDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center space-x-4">
            <div 
              className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl shadow-lg ${
                step.status === "completed"
                  ? "bg-gradient-to-br from-green-400 to-green-600 text-white"
                  : step.status === "active"
                    ? "bg-gradient-to-br from-blue-500 to-blue-700 text-white"
                    : "bg-gradient-to-br from-slate-400 to-slate-600 text-white"
              }`}
            >
              {step.icon}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-slate-900 mb-2">
                {step.title}
              </DialogTitle>
              <div className="flex items-center space-x-3">
                <Badge
                  variant="secondary"
                  className={`${
                    step.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : step.status === "active"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {step.date}
                </Badge>
                {step.timeframe && (
                  <Badge variant="outline" className="text-slate-600">
                    {step.timeframe}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <DialogDescription className="text-base text-slate-700 leading-relaxed">
            {step.description}
          </DialogDescription>

          {step.whatToExpect && (
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3">What to Expect</h4>
              <ul className="space-y-2">
                {step.whatToExpect.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-blue-800">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {step.details && (
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Key Activities</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {step.details.map((detail, index) => (
                  <div key={index} className="flex items-start space-x-2 text-sm text-slate-600">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      step.status === "completed"
                        ? "bg-green-400"
                        : step.status === "active"
                          ? "bg-blue-400"
                          : "bg-slate-400"
                    }`}></div>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step.outcome && (
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Expected Outcome</h4>
              <p className="text-sm text-slate-700">{step.outcome}</p>
            </div>
          )}

          {step.testimonial && (
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-4 border border-amber-200">
              <h4 className="font-semibold text-amber-900 mb-3">Client Experience</h4>
              <blockquote className="text-sm text-amber-800 italic mb-2">
                "{step.testimonial.quote}"
              </blockquote>
              <cite className="text-xs text-amber-700 font-medium">
                — {step.testimonial.author}, {step.testimonial.role}
              </cite>
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-slate-200">
          <Button onClick={onClose} className="w-full">
            Continue Your Journey
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}